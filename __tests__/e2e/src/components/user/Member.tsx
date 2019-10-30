import React, {FunctionComponent} from 'react'
import {Member as TMember} from '../../../../../src/entity/user'

export const Member: FunctionComponent<Props> = props => {
  return (
    <label>
      <input type="radio" name="user" value={props.user.id} onChange={props.onChange}/> 회원 {props.user.name}
    </label>
  )
}
type Props = {
  user: TMember
  onChange(e): void
}
