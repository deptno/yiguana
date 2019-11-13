import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from "querystring"
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'

export const UserPosts: FunctionComponent<Props> = props => {
  const [{items, cursor}, setResponse] = useState({items: [], cursor: undefined})
  const [token, setToken] = useState<string>()
  const getPosts = (cursor?) => {
    setToken(cursor)

    const url = ['api/my/posts']

    if (cursor) {
      url.push(qs.stringify({cursor}))
    }
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  return <Board items={items} token={token} cursor={cursor} getter={getPosts}/>
}

type Props = {

}
