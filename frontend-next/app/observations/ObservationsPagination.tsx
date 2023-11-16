"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { searchParamsAsObject } from "./helpers";

import Page from "@/app/_components/layout/Page";

export default function ObservationsPagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageParamValue = searchParams.get("page");
  const currentPage = pageParamValue ? Number(pageParamValue) : null;

  const updatePage = (page: number) => {
    console.log(page);
    const params = new URLSearchParams({
      ...searchParamsAsObject(searchParams),
      page: `${page}`,
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Page.Section background="light">
      <button
        onClick={() => updatePage(currentPage ? currentPage + 1 : 1)}
        type="button"
      >
        Next
      </button>
      <button
        onClick={() => updatePage(currentPage ? currentPage - 1 : null)}
        type="button"
      >
        Previous
      </button>
      <span>Page: {currentPage}</span>
    </Page.Section>
  );
}
