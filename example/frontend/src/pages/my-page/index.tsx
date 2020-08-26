import React from 'react'
import {NextPage} from 'next'
import {UserPostReports} from '../../components/board/UserPostReports'
import {UserCommentReports} from '../../components/board/UserCommentReports'
import {UserLikePosts} from '../../components/board/UserLikePosts'
import {UserLikeComments} from '../../components/board/UserLikeComments'
import {UserPosts} from '../../components/board/UserPosts'
import {UserComments} from '../../components/board/UserComments'

const MyPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      내가 공감한
      <div className="flex-l">
        <div className="w-100 flex-auto-l ph2-l">
          <UserLikePosts/>
        </div>
        <div className="w-100 flex-auto-l ph2-l">
          <UserLikeComments/>
        </div>
      </div>
      <hr/>
      내가 작성한
      <div className="flex-l">
        <div className="w-100 flex-auto-l ph2-l">
          <UserPosts/>
        </div>
        <div className="w-100 flex-auto-l ph2-l">
          <UserComments/>
        </div>
      </div>
      <hr/>
      내가 신고한
      <div className="flex-l">
        <div className="w-100 flex-auto-l ph2-l">
          <UserPostReports/>
        </div>
        <div className="w-100 flex-auto-l ph2-l">
          <UserCommentReports/>
        </div>
      </div>
    </div>
  )
}
export default MyPage

type Props = {}