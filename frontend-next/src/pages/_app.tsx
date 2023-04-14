import { useEffect } from "react";
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from "react-query";

import { getQueryFn } from "@/components/api";

import '@/styles/custom.scss';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn,
      retry: false,
      staleTime: 10 * 1000,
      keepPreviousData: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // Import Bootstrap (client side)
  useEffect(() => {
    import("bootstrap");
  }, []);

  return <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>;
}
