import React from 'react'
import {NextPage} from 'next'

const AdminPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      신고받은 게시물들
    </div>
  )
}
export default AdminPage

type Props = {}