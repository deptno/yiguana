import React from 'react'
import {NextPage} from 'next'
import {Boards} from '../components/board/Boards'

const IndexPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      <Boards/>
    </div>
  )
}
export default IndexPage

type Props = {}