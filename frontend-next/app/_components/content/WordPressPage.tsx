interface WordpressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API}/pages/?per_page=100`,
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json() as Promise<WordpressPage[]>;
}

export default async function WordPressPage({
  id,
  showTitle,
}: {
  id: number;
  showTitle?: boolean;
}) {
  const pages = await getData();
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
