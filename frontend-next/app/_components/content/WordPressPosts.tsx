import { getData } from "@/app/_components/api";
import DateTime from "@/app/_components/ui/DateTime";

interface Post {
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

function WordPressPost({ post }: { post: Post }) {
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
  const posts = await getData<Post[]>(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/posts/?per_page=1`,
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
