import React from 'react'
import '@deptno/color/color.css'
import Head from 'next/head'
import {TLayout} from '@component'
import {UserContext} from '@context'

export const App = ({Component, pageProps}) => {
  return (
    <UserContext.Provider>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>
      </Head>
      <TLayout>
        <Component {...pageProps} />
      </TLayout>
    </UserContext.Provider>
  )
}

export default App
