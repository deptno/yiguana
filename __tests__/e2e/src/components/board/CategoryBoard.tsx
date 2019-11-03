import React, {FunctionComponent, useCallback, useEffect, useMemo, useState} from 'react'
import {BoardItem} from './BoardItem'
import {BoardItemHeader} from './BoardItemHeader'
import {LineButton} from './LineButton'
import * as qs from "querystring"
import {api} from '../../pages/api/lib/api'
import {Board} from './Board'

export const CategoryBoard: FunctionComponent<Props> = props => {
  const {category} = props
  const [{items, nextToken}, setResponse] = useState({items: [], nextToken: undefined})
  const [token, setToken] = useState<string>()
  const getPosts = (nextToken?) => {
    setToken(nextToken)

    const url = ['api/posts']
    const params: any = {}

    if (category) {
      params.category = category
    }
    if (nextToken) {
      params.nextToken = nextToken
    }

    url.push(qs.stringify(params))

    api(url.join('?'))
      .then(setResponse)
      .catch(alert)
  }

  return <Board category={category} items={items} token={token} nextToken={nextToken} getter={getPosts}/>
}

type Props = {
  category: string
}
