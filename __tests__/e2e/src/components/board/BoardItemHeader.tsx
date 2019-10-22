import {FunctionComponent} from 'react'

export const BoardItemHeader: FunctionComponent<{}> = props => {
  return (
    <>
      <hr className="b--hot-pink bt bw1 ma0 pa0"/>
      <li className="lh-copy center flex items-center flex tc ph2 pv1 bg-black-05 bl br bb b--black-05 nowrap">
      <span className="w-20 dn db-ns">
        <i className="fas fa-cat"/>
      </span>
      <span className="w-100 flex-grow-1 pl2 cut-text">
        <i className="far fa-newspaper"/>
      </span>
      <span className="w-10 dn db-ns">
        <i className="far fa-user"/>
      </span>
      <span className="w-10 dn db-ns">
        <i className="far fa-clock"/>
      </span>
      <span className="w-10 dn db-ns">
        <i className="far fa-thumbs-up"/>
      </span>
      <span className="w-10 dn db-ns">
        <i className="far fa-eye"/>
      </span>
      <span className="w-10">
        <i className="far fa-comment-dots"/>
      </span>
      </li>
    </>
  )
}

