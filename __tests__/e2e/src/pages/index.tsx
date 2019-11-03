import React from 'react'
import {NextPage} from 'next'
import {Editor} from '../components/board/Editor'
import {Boards} from '../components/board/Boards'

const IndexPage: NextPage<Props> = props => {
  return (
    <div className="pa3 flex-column">
      <Editor/>
      <Boards/>
    </div>
  )
}
export default IndexPage

type Props = {}