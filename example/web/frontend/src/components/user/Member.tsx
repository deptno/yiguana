import React, {FunctionComponent, useRef} from 'react'
import {Member as TMember} from '../../../../../../lib/entity'
import cx from 'classnames'

export const Member: FunctionComponent<Props> = props => {
  const {user, defaultChecked} = props
  const {id, name, photo = 'https://avatars1.githubusercontent.com/u/9919?s=88&v=4'} = user
  const ref = useRef<HTMLInputElement>()

  return (
    <label className="tc ma2 w3 flex flex-column pointer">
      <input
        ref={ref}
        className="dn"
        type="radio"
        name="user"
        value={id}
        onChange={() => props.onChange(user)}
        defaultChecked={defaultChecked}
      />
      <span className="dib">
        {name}
      </span>
      ({id})
      <figure className="ma0">
        <img className={cx('br-100 w3 ba bw1', {'b--gold bw2': ref.current?.checked})} src={photo}/>
      </figure>
    </label>
  )
}
type Props = {
  user: TMember
  onChange(e): void
  defaultChecked?: boolean
}
