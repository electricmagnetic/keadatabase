import { notFound } from "next/navigation";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export async function getData<T>(url: string) {
  return fetch(url).then((result) => {
    if (!result.ok) {
      if (result.status === 404) notFound();
      throw new Error("Error fetching data");
    }
    return result.json() as Promise<T>;
  });
}
