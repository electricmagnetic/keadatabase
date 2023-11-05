import { notFound } from "next/navigation";

export async function getData<T>(url: string) {
  return fetch(url).then((result) => {
    if (!result.ok)
      throw result.status === 404
        ? notFound()
        : new Error("Error fetching data");
    return result.json() as Promise<T>;
  });
}
