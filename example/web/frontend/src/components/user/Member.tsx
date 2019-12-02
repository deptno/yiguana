import React, {FunctionComponent} from 'react'
import {Member as TMember} from '../../../../../../lib/entity'

export const Member: FunctionComponent<Props> = props => {
  const {user, defaultChecked} = props
  const {id, name, photo = 'https://avatars1.githubusercontent.com/u/9919?s=88&v=4'} = user

  return (
    <figure className="tc ma2 w3 flex flex-column">
      <span className="dib">
        {name}
      </span>
      ({id})
      <img className="br-100" src={photo}/>
      <label className="w3 mt2">
        <input
          className="mr1"
          type="radio"
          name="user"
          value={id}
          onChange={() => props.onChange(user)}
          defaultChecked={defaultChecked}
        />
      </label>
    </figure>
  )
}
type Props = {
  user: TMember
  onChange(e): void
  defaultChecked?: boolean
}
