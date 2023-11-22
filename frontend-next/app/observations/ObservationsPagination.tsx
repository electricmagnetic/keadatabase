"use client";

import { useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Loading from "../loading";

import { searchParamsAsObject } from "./helpers";

import Page from "@/app/_components/layout/Page";

export default function ObservationsPagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pageParamValue = searchParams.get("page");
  const currentPage = pageParamValue ? Number(pageParamValue) : null;

  const updatePage = (page: number | null) => {
    if (!page) return;
    const params = new URLSearchParams({
      ...searchParamsAsObject(searchParams),
      page: `${page}`,
    });
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Page.Section background="light">
      <div className="row">
        <div className="col-auto">
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
        </div>
        <div className="col">{isPending ? <span>Loading</span> : null}</div>
      </div>
    </Page.Section>
  );
}
