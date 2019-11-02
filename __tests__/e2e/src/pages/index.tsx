import React, {useState} from 'react'
import {NextPage} from 'next'
import {Board} from '../components/board/Board'
import {Editor} from '../components/board/Editor'
import * as qs from "querystring"
import {api} from './api/lib/api'

const IndexPage: NextPage<Props> = props => {
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const [token, setToken] = useState<string>()
  const getPosts = (nextToken?) => {
    setToken(nextToken)

    const url = ['api/posts']

    if (nextToken) {
      url.push(qs.stringify({nextToken}))
    }
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }
  return (
    <div className="pa3 flex-column">
      <Editor/>
      <Board items={items} token={token} nextToken={nextToken} getter={getPosts}/>
    </div>
  )
}
export default IndexPage

type Props = {}