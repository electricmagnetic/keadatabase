/**
 * SWR fetcher function for API requests
 * Handles errors and returns JSON data
 */
export async function swrFetcher<T = any>(url: string): Promise<T> {
  const result = await fetch(url);

  if (!result.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object
    (error as any).info = await result.json().catch(() => ({}));
    (error as any).status = result.status;
    throw error;
  }

  return result.json();
}
