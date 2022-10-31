import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";

import "normalize.css/normalize.css";
import "styles/base.css";

const SWR_CONFIG = {
  dedupingInterval: 24 * 60 * 60 * 1000,
  revalidateOnFocus: false,
  fetcher: (url: string) => axios.get(url).then((res) => res.data),
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={SWR_CONFIG}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
export default MyApp;
