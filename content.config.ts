import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    writing: defineCollection({
      type: 'page',
      source: 'writing/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
