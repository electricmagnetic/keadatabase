import { getData } from "@/app/_components/api";

interface Page {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

export default async function WordPressPage({
  id,
  showTitle,
}: {
  id: number;
  showTitle?: boolean;
}) {
  const pages = await getData<Page[]>(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/pages/?per_page=100`,
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
