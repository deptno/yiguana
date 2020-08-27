import React, {FunctionComponent, useState} from 'react'
import {links, data} from '../../data/users'
import {ALinkNav, AUserNav} from '@component'
import {useRouter} from 'next/router'


export const TLayout: FunctionComponent<Props> = props => {
  const [user, setUser] = useState(data[0])
  const {asPath, push} = useRouter()
  const link = links.find(l => l.href === asPath)
  const move = l => push(l.href, l.as)

  return (
    <header>
      <div className="pa3 d-schema-navy flex items-center">
        <div className="w4">
          I'm
        </div>
        <AUserNav items={data} currentItem={user} onChange={setUser}/>
      </div>
      <div className="pa3 d-schema-navy flex items-center">
        <div className="w4">
          where am I?
        </div>
        <ALinkNav items={links} currentItem={link} onChange={move} />
      </div>
      {props.children}
    </header>
  )
}
type Props = {
}