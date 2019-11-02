import React, {FunctionComponent} from 'react'
import {NonMember as TNonMember} from '../../../../../src/entity/user'

export const NonMember: FunctionComponent<Props> = props => {
  const {user, defaultChecked} = props

  return (
    <label className="w4">
      <input
        className="mr1"
        type="radio"
        name="user"
        value={user.name}
        onChange={() => props.onChange(user)}
        defaultChecked={defaultChecked}
      />
      <span>
        {user.name}({user.pw})
      </span>
    </label>
  )
}
type Props = {
  user: TNonMember
  onChange(e): void
  defaultChecked?: boolean
}
