import React, {FunctionComponent, useState} from 'react'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'

export const UserLikeComments: FunctionComponent<Props> = props => {
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const [token, setToken] = useState<string>()
  const getComments = (nextToken?) => {
    setToken(nextToken)

    const url = ['api/my/comments']
    const params: any = {like: true}

    if (nextToken) {
      params.nextToken = nextToken
    }

    url.push(qs.stringify(params))
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

//  return <Board items={items} token={token} nextToken={nextToken} getter={getComments}/>
  return null
}

type Props = {}
