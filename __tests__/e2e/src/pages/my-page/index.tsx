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
      <div>
        내가 공감 표시한 아이템들
        <UserLikePosts />
      </div>
      <div>
        내가 공감 표시한 코멘트
        <UserLikeComments/>
      </div>
      <hr/>
      <div>
        내가 작성한 글들
        <UserPosts/>
      </div>
      <div>
        내가 작성한 코멘트
        <UserComments/>
      </div>
      <hr/>
      <div>
        내가 신고한 글
        <UserReportedPosts/>
      </div>
      <div>
        내가 신고한 코멘트
        <UserReportedComments/>
      </div>
    </div>
  )
}
export default MyPage

type Props = {}