import { profile } from '~/data/profile'

/** Local time in the profile timezone, updated every 30s. Client-only rendering. */
export function useLocalTime() {
  const time = ref('')

  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: profile.timezone,
  })

  let timer: ReturnType<typeof setInterval> | undefined

  function update() {
    time.value = formatter.format(new Date())
  }

  onMounted(() => {
    update()
    timer = setInterval(update, 30_000)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  return { time }
}
