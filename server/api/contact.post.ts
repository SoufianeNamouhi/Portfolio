/**
 * POST /api/contact
 *
 * Behavior depends on configuration:
 * - CONTACT_EMAIL unset  → 503, the UI tells the visitor email is not configured.
 * - CONTACT_EMAIL set    → validates and forwards the message via the configured provider.
 *
 * Provider: set CONTACT_PROVIDER=resend plus RESEND_API_KEY to send real email.
 * Secrets live exclusively in server-side environment variables.
 */

interface ContactBody {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  /** Honeypot field — must remain empty. */
  company?: unknown
}

// Simple in-memory rate limit: max 5 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.set(ip, recent)
  if (recent.length >= MAX_REQUESTS) return true
  recent.push(now)
  return false
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, message: 'Too many messages. Please try again later.' })
  }

  const body = await readBody<ContactBody>(event)

  // Honeypot filled → silently accept without doing anything (bot).
  if (typeof body.company === 'string' && body.company.length > 0) {
    return { ok: true, message: 'Message sent.' }
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (name.length < 2 || name.length > 100) {
    throw createError({ statusCode: 400, message: 'Please provide a valid name.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) {
    throw createError({ statusCode: 400, message: 'Please provide a valid email address.' })
  }
  if (message.length < 10 || message.length > 5000) {
    throw createError({ statusCode: 400, message: 'Please provide a message between 10 and 5000 characters.' })
  }
  if (subject.length > 200) {
    throw createError({ statusCode: 400, message: 'Subject is too long.' })
  }

  const contactEmail = process.env.CONTACT_EMAIL

  if (!contactEmail) {
    // Honest state: no provider configured — never simulate success.
    throw createError({
      statusCode: 503,
      message: 'Email delivery is not configured yet. Please use one of the other channels.',
    })
  }

  if (process.env.CONTACT_PROVIDER === 'resend' && process.env.RESEND_API_KEY) {
    try {
      await $fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: {
          from: process.env.CONTACT_FROM ?? 'portfolio@resend.dev',
          to: contactEmail,
          reply_to: email,
          subject: `[Portfolio] ${subject || `Message from ${name}`}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        },
      })
      return { ok: true, message: "Thanks — your message is on its way. I'll get back to you soon." }
    } catch {
      throw createError({
        statusCode: 502,
        message: 'The email service rejected the message. Please try again later.',
      })
    }
  }

  // CONTACT_EMAIL set but no provider: log server-side, report honestly.
  console.warn('[contact] CONTACT_PROVIDER not configured; message received but not delivered.')
  throw createError({
    statusCode: 503,
    message: 'Email delivery is not configured yet. Please use one of the other channels.',
  })
})
