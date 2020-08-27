import React, {FunctionComponent} from 'react'

export const ALinkNav: FunctionComponent<Props> = props => {
  const {items, currentItem, onChange} = props

  return <>
    {items.map(t => {
      if (currentItem === t) {
        return <div className="pa2 schema-connect" key={t.name}>{t.name}</div>
      }
      return <div className="pa2" key={t.name} onClick={() => onChange(t)}>{t.name}</div>
    })}
  </>
}

type Props = {
  items
  currentItem
  onChange(user)
}
