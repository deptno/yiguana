import React from 'react'
import App from 'next/app'
import Head from 'next/dist/next-server/lib/head'
import {UserSelector} from '../components/user/UserSelector'
import {StorageContext} from '../context/StorageContext'
import {set} from '../lib/storage/storage'
import Link from 'next/link'
import {ApolloProvider} from '@apollo/react-common'
import {client} from '../lib/apollo'

export default class extends App {
  state = {
    storage: {user: null},
    debug: 'unchecked',
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <ApolloProvider client={client}>
        <StorageContext.Provider value={this.state.storage}>
          <style jsx global>
            {/* language=css */ `
pre.debug {
    display: ${this.state.debug === 'checked' ? 'block' : 'none'};
}
          `}
          </style>
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
            <div className="ph3 flex-column bg-near-white fixed w-100 bb">
              <UserSelector/>
              <nav className="">
                <ul className="list lh-copy flex">
                  <li>
                    <Link href="/">
                      <a className="link black hover-white hover-bg-blue br1 pa1 mr3 ba">보드</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-page">
                      <a className="link black hover-white hover-bg-blue br1 pa1 mr3 ba">마이페이지</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin">
                      <a className="link black hover-white hover-bg-blue br1 pa1 mr3 ba">관리자</a>
                    </Link>
                  </li>
                  <li>
                    <label>
                      <input type="checkbox" value={this.state.debug} onChange={this.onDebugUpdate}/> 디버그
                    </label>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="h5 mv2"/>
            <Component {...pageProps} />
          </div>
        </StorageContext.Provider>
      </ApolloProvider>
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
        [e.key]: value,
      },
    })
  }

  onDebugUpdate = () => {
    this.setState({
      debug: this.state.debug === 'checked'
        ? 'unchecked'
        : 'checked',
    })
  }
}
