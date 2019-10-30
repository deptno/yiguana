import React, {FunctionComponent} from 'react'
import {NonMember as TNonMember} from '../../../../../src/entity/user'

export const NonMember: FunctionComponent<Props> = props => {
  return (
    <label>
      <input type="radio" name="user" value={props.user.name} onChange={props.onChange}/> 비회원 {props.user.name}
    </label>
  )
}
type Props = {
  user: TNonMember
  onChange(e): void
}
