import { z } from "zod";

import fetcher from "../api/fetcher";
import DateTime from "../ui/DateTime";

type WordPressBlockBaseProps = {
  baseUrl?: string;
};

type WordPressPageClassNames = {
  wrapper?: string;
  title?: string;
  content?: string;
};

type WordPressPostsClassNames = {
  list?: string;
  item?: string;
  link?: string;
  title?: string;
  date?: string;
  excerpt?: string;
};

/**
 * WordPress uses a non-standard ISO-style date/time string (e.g. 2023-11-27T19:02:04).
 * We know that the API returns a GMT (Z) date, so we can add/remove a Z to the string to reflect this.
 */
export const wordpressDateStringToDate = z.codec(z.string(), z.date(), {
  decode: (isoString) => new Date(`${isoString}Z`),
  encode: (date) => date.toISOString().slice(0, -1),
});

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
  date_gmt: wordpressDateStringToDate,
  excerpt: z.object({
    rendered: z.string(),
  }),
  link: z.string(),
});

/**
 * Fetch a page from the WordPress UI (based on the provided ID) and optionally render its title.
 */
export async function WordPressPage({
  baseUrl,
  classNames,
  id,
  showTitle,
}: WordPressBlockBaseProps & {
  classNames?: WordPressPageClassNames;
  id: number;
  showTitle?: boolean;
}) {
  const pagesFetch = await fetcher(
    `${baseUrl}/pages/?per_page=100`, // assumption that we will never have more than 100 pages
    z.array(WordPressPageSchema),
  );

  if (!pagesFetch.success) return null;
  const { data: pages } = pagesFetch;

  const selectedPage = pages.find((page) => page.id === id);

  if (!selectedPage) return null;

  return (
    <div className={classNames?.wrapper}>
      {showTitle ? (
        <h2
          className={classNames?.title}
          dangerouslySetInnerHTML={{ __html: selectedPage.title.rendered }}
        />
      ) : null}
      <div
        className={classNames?.content}
        dangerouslySetInnerHTML={{ __html: selectedPage.content.rendered }}
      />
    </div>
  );
}

function WordPressPost({
  post,
  classNames,
}: {
  post: z.infer<typeof WordPressPostSchema>;
  classNames?: WordPressPostsClassNames;
}) {
  return (
    <li className={classNames?.item}>
      <a className={classNames?.link} href={post.link}>
        <h3
          className={classNames?.title}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </a>
      <h4 className={classNames?.date}>
        <DateTime dateTime={post.date_gmt} />
      </h4>
      <div
        className={classNames?.excerpt}
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
    </li>
  );
}

/**
 * Fetch a given number of posts from the WordPress API.
 */
export async function WordPressPosts({
  baseUrl,
  classNames,
  take = 1,
}: WordPressBlockBaseProps & {
  classNames?: WordPressPostsClassNames;
  take?: number;
}) {
  const postsFetch = await fetcher(
    `${baseUrl}/posts/?per_page=${take}`,
    z.array(WordPressPostSchema),
  );

  if (!postsFetch.success) return null;
  const { data: posts } = postsFetch;

  if (posts.length === 0) return null;

  return (
    <ul className={classNames?.list}>
      {posts.map((post) => (
        <WordPressPost key={post.id} post={post} classNames={classNames} />
      ))}
    </ul>
  );
}
