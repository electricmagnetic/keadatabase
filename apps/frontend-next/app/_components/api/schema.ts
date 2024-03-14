import { z } from "zod";

/**
 * Standard paginated Django REST Framework API response
 */
export const ApiListResponseSchema = z.object({
  count: z.number(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(z.unknown()),
});

/**
 * Standard response from the REST API for media objects, falls back to placeholders
 */
export const MediaSchema = z
  .object({
    thumbnail: z.string().url(),
    full_size: z.string().url(),
    large: z.string().url(),
  })
  .catch({
    thumbnail: "/placeholders/thumbnail.png",
    full_size: "/placeholders/large.png", // TODO one day replace this with a better placeholder
    large: "/placeholders/large.png",
  });

export type Media = z.infer<typeof MediaSchema>;

export type PageWithSlugProps<P = unknown> = P & {
  params: { slug: unknown };
};

export type PageWithIdProps<P = unknown> = P & {
  params: { id: unknown };
};
