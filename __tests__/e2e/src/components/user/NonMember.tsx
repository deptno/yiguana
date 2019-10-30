import React, {FunctionComponent} from 'react'
import {NonMember as TNonMember} from '../../../../../src/entity/user'

export const NonMember: FunctionComponent<Props> = props => {
  const {user} = props

  return (
    <label>
      <input type="radio" name="user" value={user.name} onChange={() => props.onChange(user)}/> 비회원 {user.name}
    </label>
  )
}
type Props = {
  user: TNonMember
  onChange(e): void
}
