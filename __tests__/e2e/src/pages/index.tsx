import React, {useEffect} from 'react'
import {NextPage} from 'next'

const IndexPage: NextPage<Props> = props => {
  useEffect(() => {
    fetch('api')
      .then(res => res.text())
      .then(console.log)
  }, [])

  return (
    <div>hello world</div>
  )
}

type Props = {}