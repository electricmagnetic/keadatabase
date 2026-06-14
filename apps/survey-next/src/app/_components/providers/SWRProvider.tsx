"use client";

import { SWRConfig } from "swr";
import { swrFetcher } from "../api/fetcher";

const CACHE_TIME = 24 * 60 * 60 * 1000; // 24 hours

interface SWRProviderProps {
  children: React.ReactNode;
}

/**
 * SWR configuration provider
 * Configures global fetcher and caching behavior
 */
export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        dedupingInterval: CACHE_TIME,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}
