import React, {FunctionComponent, useMemo, useState} from 'react'
import {Board} from './Board'

export const CategoryBoard: FunctionComponent<Props> = props => {
  const {category, items} = props

  return <Board items={items} />
}

type Props = {
  category: string
  items: any[]
}
