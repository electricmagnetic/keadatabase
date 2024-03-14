"use client";

import { useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import classNames from "classnames";

import { validPage } from "./pagination";

import Loader from "@/app/_components/ui/Loader";

type Direction = "increase" | "decrease";

export function Paginator({
  scroll,
  isMore,
  count,
  total,
}: {
  isMore?: boolean;
  scroll?: boolean;
  count?: number;
  total?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const calculatePage = (direction: Direction, page: number): number => {
    const newPage = direction === "increase" ? page + 1 : page - 1;

    return validPage(newPage);
  };

  const update = (direction: Direction) => {
    const newPage = calculatePage(direction, page);

    const params = new URLSearchParams({
      ...Object.fromEntries(new URLSearchParams(searchParams)),
      page: `${newPage}`,
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll });
    });
  };

  const page = validPage(searchParams.get("page"));

  const disableNext = !isMore;
  const disablePrevious = page === 1;
  const showPagination = !(disableNext && disablePrevious);

  return showPagination ? (
    <nav aria-label="Page Navigation" className="text-center">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className={classNames("page-link", disablePrevious && "disabled")}
            disabled={disablePrevious}
            onClick={() => {
              update("decrease");
            }}
            type="button"
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className={classNames("page-link", disableNext && "disabled")}
            disabled={disableNext}
            onClick={() => {
              update("increase");
            }}
            type="button"
          >
            Next
          </button>
        </li>
      </ul>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <p className="small mb-1">Page {page}</p>
          <p className="small mb-0">
            {count ? `Showing ${count}` : null}
            {count && total ? " of " : null}
            {total ? `${total}` : null}
            {count || total ? " items" : null}
          </p>
        </>
      )}
    </nav>
  ) : null;
}
