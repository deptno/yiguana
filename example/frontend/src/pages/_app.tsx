import React from 'react'
import '@deptno/color/color.css'
import Head from 'next/head'
import {Layout} from '../component/template/layout'

function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
