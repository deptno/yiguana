import React, {FunctionComponent} from 'react'
import {Member as TMember} from '../../../../../src/entity/user'

export const Member: FunctionComponent<Props> = props => {
  const {user} = props

  return (
    <label>
      <input type="radio" name="user" value={user.id} onChange={() => props.onChange(user)}/> 회원 {user.name}
    </label>
  )
}
type Props = {
  user: TMember
  onChange(e): void
}
