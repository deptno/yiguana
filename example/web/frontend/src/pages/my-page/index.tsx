import React from 'react'
import {NextPage} from 'next'
import {UserPosts} from '../../components/board/UserPosts'
import {UserComments} from '../../components/board/UserComments'
import {UserLikePosts} from '../../components/board/UserLikePosts'
import {UserLikeComments} from '../../components/board/UserLikeComments'
import {UserReportedPosts} from '../../components/board/UserReportedPosts'
import {UserReportedComments} from '../../components/board/UserReportedComments'

const MyPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      내가 공감한
      <div className="flex-l">
        <div className="w-100">
          <UserLikePosts/>
        </div>
        <div className="w-100">
          <UserLikeComments/>
        </div>
      </div>
      <hr/>
      내가 작성한
      <div className="flex-l">
        <div className="w-100">
          <UserPosts/>
        </div>
        <div className="w-100">
          <UserComments/>
        </div>
      </div>
      <hr/>
      내가 신고한
      <div className="flex-l">
        <div className="w-100">
          <UserReportedPosts/>
        </div>
        <div className="w-100">
          <UserReportedComments/>
        </div>
      </div>
    </div>
  )
}
export default MyPage

type Props = {}