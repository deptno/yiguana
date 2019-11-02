import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from "querystring"
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'

export const UserComments: FunctionComponent<Props> = props => {
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const [token, setToken] = useState<string>()
  const getComments = (nextToken?) => {
    setToken(nextToken)

    const url = ['api/my/comments']

    if (nextToken) {
      url.push(qs.stringify({nextToken}))
    }
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  console.table(items)
  useEffect(() => {
    getComments()
  }, [])
//  return <Board items={items} token={token} nextToken={nextToken} getter={getPosts}/>

  return <span>[GSI 미구현으로 보임]</span>
}

type Props = {

}
