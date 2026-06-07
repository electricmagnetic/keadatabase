"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export function BodyWithClasses({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const getPageClass = () => {
    if (pathname.startsWith("/submit")) return "page--submit";
    if (pathname.startsWith("/surveys")) return "page--surveys";
    if (pathname.startsWith("/analysis")) return "page--analysis";
    if (pathname.startsWith("/grid")) return "page--grid";
    if (pathname.startsWith("/about")) return "page--about";
    if (pathname.startsWith("/instructions")) return "page--instructions";
    if (pathname.startsWith("/legal")) return "page--legal";
    return "";
  };

  const pageClass = getPageClass();

  return (
    <body className={pageClass} suppressHydrationWarning>
      {children}
    </body>
  );
}
