import Image, { type StaticImageData } from "next/image";
import type { PropsWithChildren } from "react";

import Page from "./Page";

export default function SectionHero({
  children,
  imageAlt,
  image,
}: PropsWithChildren<{
  image: StaticImageData;
  imageAlt: string;
}>) {
  return (
    <Page.Section background="secondary" size="large">
      <Image
        alt={imageAlt}
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={image}
        style={{
          objectFit: "cover",
          objectPosition: "bottom",
        }}
      />
      <div className="position-relative">{children}</div>
    </Page.Section>
  );
}
