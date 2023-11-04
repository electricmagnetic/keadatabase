import Image, { type StaticImageData } from "next/image";
import type { PropsWithChildren } from "react";

export default function SectionHero({
  children,
  imageAlt,
  image,
}: PropsWithChildren<{
  image: StaticImageData;
  imageAlt: string;
}>) {
  return (
    <section
      className="position-relative py-8"
      style={{
        backgroundColor: "var(--bs-secondary)",
        color: "var(--bs-white)",
      }}
    >
      <Image
        alt={imageAlt}
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={image}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="container position-relative">{children}</div>
    </section>
  );
}
