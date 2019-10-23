import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import * as R from 'ramda'
import {Post} from '../../../../src/entity/post'
import Head from 'next/head'
import {Board} from '../components/board/Board'
import {PaginationResult} from '@deptno/dynamodb/dist/api'
import {Editor} from '../components/board/Editor'

const IndexPage: NextPage<Props> = props => {
  return (
    <div>
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
      </Head>
      <div className="pa3 flex-column">
        <Editor/>
        <Board/>
      </div>
    </div>
  )
}
export default IndexPage

type Props = {}