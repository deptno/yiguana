import React, {FunctionComponent} from 'react'
import {Member as TMember} from '../../../../src/entity/user'

export const Member: FunctionComponent<Props> = props => {
  const {user, defaultChecked} = props

  return (
    <label className="w4">
      <input
        className="mr1"
        type="radio"
        name="user"
        value={user.id}
        onChange={() => props.onChange(user)}
        defaultChecked={defaultChecked}
      />
      <span>
        {user.name}({user.id})
      </span>
    </label>
  )
}
type Props = {
  user: TMember
  onChange(e): void
  defaultChecked?: boolean
}
