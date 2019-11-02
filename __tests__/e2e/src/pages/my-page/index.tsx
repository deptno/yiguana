import React from 'react'
import {NextPage} from 'next'

const MyPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      내가 공감 표시한 아이템들
    </div>
  )
}
export default MyPage

type Props = {}