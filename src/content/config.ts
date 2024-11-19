import { defineCollection, z } from 'astro:content';

const hemoce = defineCollection({
	schema: z.object({
		title: z.string(),
		showTitle: z.boolean().default(false),
		overrideTitle: z.string().optional(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		favicon: z.string().optional()
	}),
});

export const collections = { hemoce };
