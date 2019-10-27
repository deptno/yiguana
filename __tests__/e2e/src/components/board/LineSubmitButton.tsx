import {FunctionComponent} from 'react'

export const LineSubmitButton: FunctionComponent<Props> = props => {
  return (
    <button className="w-100 bn pa0 link near-black">
      <li
        className="lh-copy center flex items-center flex tc pointer pa2 bl br bb b--black-05 nowrap bg-black-05 hover-bg-light-pink pointer"
      >
        <span className="w-100 cut-text">
          {props.children}
        </span>
      </li>
    </button>
  )
}

type Props = {
  children: string
}
