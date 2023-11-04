import DateTime from "@/app/_components/ui/DateTime";

interface WordpressPost {
  id: number;
  title: {
    rendered: string;
  };
  date: string;
  excerpt: {
    rendered: string;
  };
  link: string;
}

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts/?per_page=1`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json() as Promise<WordpressPost[]>;
}

function Post({ post }: { post: WordpressPost }) {
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

export default async function WordPressPosts() {
  const posts = await getData();

  if (posts.length === 0) return null;

  return (
    <ul className="list-unstyled">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
