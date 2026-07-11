import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const menu = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/menu' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    description: z.string().optional(),
    // Key into the stock photo map in MenuCategory usage — optional.
    image: z.string().optional(),
    items: z.array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        tags: z.array(z.enum(['spicy', 'vegetarian', 'gf', 'popular'])).optional(),
      }),
    ),
  }),
});

export const collections = { menu };
