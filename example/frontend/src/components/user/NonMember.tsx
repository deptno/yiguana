import React, {FunctionComponent, useRef} from 'react'
import {NonMember as TNonMember} from '../../../../../lib/entity'
import cx from 'classnames'

export const NonMember: FunctionComponent<Props> = props => {
  const {defaultChecked} = props
  const ref = useRef<HTMLInputElement>()
  const photo = 'https://avatars1.githubusercontent.com/u/9919?s=88&v=4'

  return (
    <label className="tc ma2 w3 flex flex-column pointer">
      <input
        ref={ref}
        className="dn"
        type="radio"
        name="user"
        value=""
        onChange={() => props.onChange({name: ''})}
        defaultChecked={defaultChecked}
      />
      <span className="dib">
        ?
      </span>
      (비회원)
      <figure className="ma0">
        <img className={cx('br-100 w3 ba bw1', {'b--gold bw2': ref.current?.checked})} src={photo}/>
      </figure>
    </label>
  )
}
type Props = {
  onChange(e?): void
  defaultChecked?: boolean
}
