import React from 'react'
import App from 'next/app'
import Head from 'next/dist/next-server/lib/head'
import {UserSelector} from '../components/user/UserSelector'
import {StorageContext} from '../context/StorageContext'
import {set} from '../lib/storage/storage'

export default class extends App {
  state = {
    storage: {user: null},
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <StorageContext.Provider value={this.state.storage}>
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
        <div>
          <UserSelector/>
          <Component {...pageProps} />
        </div>
      </StorageContext.Provider>
    )
  }

  componentDidMount() {
    window.addEventListener('storage', this.onStorageUpdate)

    const user = localStorage.getItem('user')
    if (user) {
      set('user', user)
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('storage', this.onStorageUpdate)
  }

  onStorageUpdate = (e: StorageEvent) => {
    this.setState({
      storage: {
        ...localStorage,
        [e.key]: JSON.parse(e.newValue),
      },
    })
  }
}
