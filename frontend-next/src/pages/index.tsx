import Head from 'next/head';

import SampleGet from '@/components/SampleGet';

export default function Home() {
  return (
    <>
      <Head>
        <title>Kea Database</title>
      </Head>
      <main>
        <h1>Kea Database v3</h1>
        <SampleGet />
      </main>
    </>
  )
}
