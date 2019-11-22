import React, {FunctionComponent} from 'react'
import Link from 'next/link'

export const LineLink: FunctionComponent<Props> = props => {
  return (
    <Link href={props.href}>
      <a className="pa2 link near-black lh-copy flex bg-light-gray hover-bg-light-pink" href="#">
        <span className="tc w-100">{props.children}</span>
        <i className="pv1 ml-auto fas fa-long-arrow-alt-right"/>
      </a>
    </Link>
  )
}

type Props = {
  children: string
  href: string
}
