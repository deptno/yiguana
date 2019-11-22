import {FunctionComponent} from 'react'

export const LineButton: FunctionComponent<Props> = props => {
  return (
    <a className="link near-black" onClick={props.onClick}>
      <li
        className="lh-copy center flex items-center flex tc pointer pa2 bl br bb b--black-05 nowrap bg-black-05 hover-bg-light-pink pointer"
      >
        <span className="w-100 cut-text">
          {props.children}
        </span>
      </li>
    </a>
  )
}

type Props = {
  children: string
  onClick(): void
}
