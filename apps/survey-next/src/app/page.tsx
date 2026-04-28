import Image from "next/image";

export default async function HomePage() {
  // Simple fetch to check API wired up correctly
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/surveys/surveys/`,
  );

  const data = response.ok
    ? ((await response.json()) as { count: number })
    : null;

  return (
    <main>
      <Image
        src="/images/logo.svg"
        width={64}
        height={64}
        alt="Kea Survey"
        priority
      />
      <h1>Kea Survey</h1>
      {data ? (
        <p>There are currently {data.count} surveys.</p>
      ) : (
        <p>
          <em>Unable to fetch surveys.</em>
        </p>
      )}
    </main>
  );
}
