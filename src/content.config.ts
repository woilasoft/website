import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
			tags: z.array(z.string())
		}),
});

export const collections = { blog };
