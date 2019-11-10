import React, {FunctionComponent, useState} from 'react'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'
import {Comments} from '../post/Comments'
import {MyComments} from '../post/MyComments'

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

  return <MyComments items={items} token={token} nextToken={nextToken} getter={getComments}/>
}

type Props = {}
