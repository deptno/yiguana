import React, {FunctionComponent, useState} from 'react'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'
import {Comments} from '../post/Comments'
import {MyComments} from '../post/MyComments'

export const UserLikeComments: FunctionComponent<Props> = props => {
  const [{items, cursor}, setResponse] = useState({items: [], cursor: undefined})
  const [token, setToken] = useState<string>()
  const getComments = (cursor?) => {
    setToken(cursor)

    const url = ['api/my/comments']
    const params: any = {like: true}

    if (cursor) {
      params.cursor = cursor
    }

    url.push(qs.stringify(params))
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  return <MyComments items={items} token={token} cursor={cursor} getter={getComments}/>
}

type Props = {}
