import React from 'react'
import {NextPage} from 'next'
import {UserPosts} from '../../components/board/UserPosts'
import {UserComments} from '../../components/board/UserComments'
import {UserReplies} from '../../components/board/UserReplies'
import {UserLikePosts} from '../../components/board/UserLikePosts'

const MyPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      <div>
        내가 공감 표시한 아이템들
        <UserLikePosts />
      </div>
      <div>
        내가 작성한 글들
        <UserPosts/>
      </div>
      <div>
        내가 작성한 코멘트
        <UserComments/>
      </div>
      <div>
        내가 작성한 답글들(클리앙은 코멘트로 둘이 합쳐져있음)
        <UserReplies/>
      </div>
    </div>
  )
}
export default MyPage

type Props = {}