import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import axios from "axios";

import { ShowMenuContext } from "components/context";

import "bootstrap/dist/css/bootstrap.min.css";
import "styles/base.css";

const SWR_CONFIG = {
  dedupingInterval: 24 * 60 * 60 * 1000,
  revalidateOnFocus: false,
  fetcher: (url: string) => axios.get(url).then((res) => res.data),
};

const EMBED_KEYWORD = "embed";

function MyApp({ Component, pageProps }: AppProps) {
  const { query } = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  // Update 'showMenu' based on the presence/absence of embed keyword
  useEffect(() => setShowMenu(EMBED_KEYWORD in query ? false : true), [query]);

  return (
    <SWRConfig value={SWR_CONFIG}>
      <ShowMenuContext.Provider value={showMenu}>
        <Component {...pageProps} />
      </ShowMenuContext.Provider>
    </SWRConfig>
  );
}
export default MyApp;
