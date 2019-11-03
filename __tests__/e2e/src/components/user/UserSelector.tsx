import React, {FunctionComponent, useContext, useEffect} from 'react'
import * as R from 'ramda'
import * as userData from '../../../../__data__/user'
import {Member} from './Member'
import {NonMember} from './NonMember'
import {Member as TMember, NonMember as TNonMember} from '../../../../../src/entity/user'
import {setUser} from '../../lib/storage/user'
import {StorageContext} from '../../context/StorageContext'

const users = Object.values(userData)
const members = users.filter<TMember>(R.compose(R.complement(R.isNil), R.prop('id')))
const nonMembers = users.filter<TNonMember>(R.compose(R.isNil, R.prop('id')))

export const UserSelector: FunctionComponent<Props> = props => {
  const {user: currentUser} = useContext(StorageContext)

  return (
      <div className="ph3 pv2 flex-column w-100">
        <pre className="debug mv0 pv0 lh-copy">선택된 유저 정보: {JSON.stringify(currentUser)}</pre>
        <div className="flex">
          <span className="w4">회원 name(id)</span>
          {members.map(user =>
            <Member
              key={user.id}
              user={user}
              onChange={setUser}
              defaultChecked={R.o(R.equals(user.id), R.prop('id'), currentUser)}
            />,
          )}
        </div>
        <div className="flex">
          <span className="w4">비회원 name(pw)</span>
          {nonMembers.map(user =>
            <NonMember
              key={user.name}
              user={user}
              onChange={setUser}
              defaultChecked={R.o(R.equals(user.name), R.prop('name'), currentUser)}
            />,
          )}
        </div>
      </div>
  )
}

type Props = {}

