import * as z from "zod";

import { getData } from "@/app/_components/api/actions";
import DateTime from "@/app/_components/ui/DateTime";

const WordPressCommonSchema = z.object({
  id: z.number(),
  title: z.object({
    rendered: z.string(),
  }),
});

const WordPressPageSchema = WordPressCommonSchema.extend({
  content: z.object({
    rendered: z.string(),
  }),
});

const WordPressPostSchema = WordPressCommonSchema.extend({
  date: z.string(), // non-standard date format, so just treat as string
  excerpt: z.object({
    rendered: z.string(),
  }),
  link: z.string(),
});

export async function WordPressPage({
  id,
  showTitle,
}: {
  id: number;
  showTitle?: boolean;
}) {
  const pages = await getData(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/pages/?per_page=100`,
    z.array(WordPressPageSchema),
  );

  const selectedPage = pages.find((page) => page.id === id);

  if (!selectedPage) return null;

  return (
    <div>
      {showTitle ? (
        <h2 dangerouslySetInnerHTML={{ __html: selectedPage.title.rendered }} />
      ) : null}
      <div
        dangerouslySetInnerHTML={{ __html: selectedPage.content.rendered }}
      />
    </div>
  );
}

function WordPressPost({
  post,
}: {
  post: z.infer<typeof WordPressPostSchema>;
}) {
  return (
    <li className="Post mb-3">
      <a href={post.link}>
        <h3
          className="h5 mb-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </a>
      <h4 className="h6">
        <DateTime datetime={post.date} />
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
    </li>
  );
}

export async function WordPressPosts() {
  const posts = await getData(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts/?per_page=1`,
    z.array(WordPressPostSchema),
  );

  if (posts.length === 0) return null;

  return (
    <ul className="list-unstyled">
      {posts.map((post) => (
        <WordPressPost key={post.id} post={post} />
      ))}
    </ul>
  );
}
