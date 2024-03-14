"use client";

import { useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { validPage } from "./pagination";

import Loader from "@/app/_components/ui/Loader";

type Direction = "increase" | "decrease";

export function Paginator({ scroll }: { scroll?: boolean }) {
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

  return (
    <div className="bg-light-subtle border p-2 row justify-content-between align-items-center">
      <div className="col text-start">
        <button
          className="btn btn-light btn-sm"
          disabled={page === 1}
          onClick={() => {
            update("decrease");
          }}
          type="button"
        >
          Previous
        </button>
      </div>
      <div className="col text-center">
        {isPending ? <Loader small /> : <span>Showing page {page}</span>}
      </div>
      <div className="col text-end">
        <button
          className="btn btn-light btn-sm"
          onClick={() => {
            update("increase");
          }}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
