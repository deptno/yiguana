import React from 'react'
import App from 'next/app'
import Head from 'next/dist/next-server/lib/head'
import {UserSelector} from '../components/user/UserSelector'
import {StorageContext} from '../context/StorageContext'
import {set} from '../lib/storage/storage'
import Link from 'next/link'

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
          <nav className="pt3">
            <ul className="list lh-copy flex">
              <li><Link href="/"><a className="link black hover-white hover-bg-blue br1 pa1 mr3">보드</a></Link></li>
              <li><Link href="/my-page"><a className="link black hover-white hover-bg-blue br1 pa1 mr3">마이페이지</a></Link></li>
              <li><Link href="/admin"><a className="link black hover-white hover-bg-blue br1 pa1 mr3">관리자</a></Link></li>
            </ul>
          </nav>
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
    const {ip, ...value} = JSON.parse(e.newValue)
    this.setState({
      storage: {
        ...localStorage,
        [e.key]: value
      },
    })
  }
}
