import React, {FunctionComponent, useContext} from 'react'
import * as R from 'ramda'
import * as userData from '../../data/user'
import {Member} from './Member'
import {NonMember} from './NonMember'
import {Member as TMember} from '../../../../../../lib/entity'
import {setUser} from '../../lib/storage/user'
import {StorageContext} from '../../context/StorageContext'

const users = Object.values(userData)
const members = users.filter<TMember>(R.compose(R.complement(R.isNil), R.prop('id')))

export const UserSelector: FunctionComponent<Props> = props => {
  const {user: currentUser} = useContext(StorageContext)

  return (
    <div className="ph0 pv2 flex-column w-100">
      <pre className="debug mv0 pv0 lh-copy">선택된 유저 정보: {JSON.stringify(currentUser)}</pre>
      <div className="flex pre">
        <NonMember onChange={setUser} defaultChecked={R.o(R.equals(''), R.prop('name'), currentUser)} />
        {members.map(user =>
          <Member
            key={user.id}
            user={user}
            onChange={setUser}
            defaultChecked={R.o(R.equals(user.id), R.prop('id'), currentUser)}
          />,
        )}
      </div>
    </div>
  )
}

type Props = {}

