import {defineCollection} from 'astro:content'
import {z} from 'astro/zod'
import {glob} from 'astro/loaders'

const schema_blog = z.object({
  title: z.string()
, description: z.string()
, pub_date: z.coerce.date()
, updated_date: z.string().optional()
, hero_img: z.string().optional()
})
const collection_blog = defineCollection({
  loader: glob({pattern: '**/*.{md,mdx}', base: './src/content/blog'})
, schema: schema_blog
})

export type BlogSchema = z.infer<typeof schema_blog>
export const collections = {blog: collection_blog}
