import React from 'react'
import App from 'next/app'
import Head from 'next/dist/next-server/lib/head'

export default class extends App {
  render() {
    const {Component, pageProps} = this.props
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.11.1/tachyons.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
          />
          <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"/>
          <script src="https://cdn.quilljs.com/1.3.6/quill.js"/>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}