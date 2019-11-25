import React from 'react'
import {NextPage} from 'next'
import {Editor} from '../../components/board/Editor'

const IndexPage: NextPage<Props> = props => {

  return (
    <div className="pa3 flex-column">
      <Editor/>
    </div>
  )
}
export default IndexPage

type Props = {}