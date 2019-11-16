import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from "querystring"
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'

export const UserReplies: FunctionComponent<Props> = props => {
  const [{items, cursor}, setResponse] = useState({items: [], cursor: undefined})
  const [token, setToken] = useState<string>()
  const getReplies = (cursor?) => {
    setToken(cursor)

    const url = ['api/my/replies']

    if (cursor) {
      url.push(qs.stringify({cursor}))
    }
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  console.table(items)
  useEffect(() => {
    if (false) {
      getReplies()
    }
  }, [])
//  return <Board items={items} token={token} cursor={cursor} getter={getPosts}/>

  return <span>[후순위 미구현, 구현 미결정]</span>
}

type Props = {

}
