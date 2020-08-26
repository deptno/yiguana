import React, {FunctionComponent, useState} from 'react'
import {users} from '../../data/users'

export const Layout: FunctionComponent<Props> = props => {
  const [user, setUser] = useState(users[0])

  return (
    <>
      <header className="pa3 d-schema-navy flex justify-center items-center">
        <div className="pa2">
          select user
        </div>
        {users.map(u => {
          if (user === u) {
            return <div className="pa2 schema-connect" key={u.name}>{u.name}</div>
          }
          return <div className="pa2" key={u.name}>{u.name}</div>
        })}
      </header>
      {props.children}
    </>
  )
}
type Props = {}