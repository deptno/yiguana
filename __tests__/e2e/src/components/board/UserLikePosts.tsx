import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from 'querystring'
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'
import {CategoryBoard} from './CategoryBoard'

export const UserLikePosts: FunctionComponent<Props> = props => {
  const [{items, cursor}, setResponse] = useState({items: [], cursor: undefined})
  const [token, setToken] = useState<string>()
  const getPosts = (cursor?) => {
    setToken(cursor)

    const url = ['api/my/posts']
    const params: any = {like: true}

    if (cursor) {
      params.cursor = cursor
    }

    url.push(qs.stringify(params))
    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  return (
    <div className="pl0 flex-column justify-center items-center list mv0">
      <Board items={items}/>
    </div>
  )
}

type Props = {}
