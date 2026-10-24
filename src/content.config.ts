import {z, defineCollection} from 'astro:content'
import {glob} from 'astro/loaders'

const schema_blog = z.object({
    title: z.string()
    , description: z.string()
    , pub_date: z.coerce.date()
    , updated_date: z.string().optional()
    , hero_img: z.string().optional(),
})

// const storeSchema = z.object({
//     title: z.string(),
//     description: z.string(),
//     details: z.boolean().optional(),
//     custom_link_label: z.string(),
//     custom_link: z.string().optional(),
//     updated_date: z.coerce.date(),
//     pricing: z.string().optional(),
//     oldPricing:  z.string().optional(),
//     badge: z.string().optional(),
//     checkoutUrl: z.string().optional(),
//     hero_img: z.string().optional(),
// });

export type BlogSchema = z.infer<typeof schema_blog>
// export type StoreSchema = z.infer<typeof storeSchema>

const collection_blog = defineCollection({
    loader: glob({base: './src/content/blog', pattern: '**/*.md'})
  , schema: schema_blog
})
// const storeCollection = defineCollection({ schema: storeSchema });

export const collections = {
    blog: collection_blog,
    // 'store': storeCollection
}
