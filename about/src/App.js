import React from 'react';

import { SWRConfig } from 'swr';

import HomePage from './views/index';

const CACHE_TIME = 24 * 60 * 60 * 1000;

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((result) => result.json()),
        dedupingInterval: CACHE_TIME,
        revalidateOnFocus: false,
      }}
    >
      <div className="App">
        <HomePage />
      </div>
    </SWRConfig>
  );
}

export default App;
