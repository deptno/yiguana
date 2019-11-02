import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'

export const UserLikePosts: FunctionComponent<Props> = props => {
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const [token, setToken] = useState<string>()
  const getPosts = (nextToken?) => {
    setToken(nextToken)

    const url = ['api/my/posts']

    const params: any = {like: true}
    if (nextToken) {
      params.nextToken = nextToken
    }

    url.push(qs.stringify(params))
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  return <Board items={items} token={token} nextToken={nextToken} getter={getPosts}/>
}

type Props = {}
