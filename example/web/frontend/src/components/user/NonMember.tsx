import React, {FunctionComponent} from 'react'
import {NonMember as TNonMember} from '../../../../../../lib/entity'

export const NonMember: FunctionComponent<Props> = props => {
  const {defaultChecked} = props

  return (
    <figure className="tc ma2 w4 flex flex-column">
      비로그인
      <img className="br-100" src="https://avatars1.githubusercontent.com/u/9919?s=88&v=4"/>
      <label className="w3 mt2">
        <input
          className="mr1"
          type="radio"
          name="user"
          value=""
          onChange={() => props.onChange()}
          defaultChecked={defaultChecked}
        />
      </label>
    </figure>
  )
}
type Props = {
  onChange(e?): void
  defaultChecked?: boolean
}
