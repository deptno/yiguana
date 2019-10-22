import React, {FunctionComponent, useEffect} from 'react'
import Link from 'next/link'
import {ECOMMUNITY_NAME, ROUTE} from '../../route'
import {Board} from './Board'
import cx from 'classnames'
import {connect} from 'react-redux'
import {RootState} from '../../redux'
import {getPosts} from '../../redux/action-creator'

const NamedBoardComponent: FunctionComponent<Props> = props => {
  const {name, link, className, getPosts, items} = props

  useEffect(() => {
    getPosts({
      board: 'channel',
      category: ECOMMUNITY_NAME[name].slice(0, 3)
    })
  }, [this])

  return (
    <div id={name} className={cx('category-board pv3 mv3 bg-white relative b--near-white', className)}>
      <div className="mv0 ph2 ph3-ns di lh-copy flex flex-column">
        <Title name={name} link={link}/>
        <Board items={items} header/>
      </div>
    </div>
  )
}
const mapStateToProps = (state: RootState, props: OwnProps) => {
  const {posts} = state.post
  const category = ECOMMUNITY_NAME[props.name].slice(0, 3)

  if (posts.channel) {
    if (posts.channel[category]) {
      return posts.channel[category]
    }
  }

  return {
    items: []
  }
}
const mapDispatchToProps = {
  getPosts
}
export const NamedBoard = connect(mapStateToProps, mapDispatchToProps)(NamedBoardComponent)

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof mapDispatchToProps
type OwnProps = {
  name: keyof typeof ECOMMUNITY_NAME
  className?: string
  link?: boolean
}
type Props = StateProps & DispatchProps & OwnProps

const Title: FunctionComponent<OwnProps> = props => {
  const {name, link} = props
  const category = ECOMMUNITY_NAME[name]
  const h2Class = cx(
    'mv0 pb3 f3 near-black dib w-100 flex items-baseline ttu b--hot-pink bb bw1',
    {
      'hover-hot-pink': link
    }
  )
  if (link) {
    return (
      <Link href={`${ROUTE.COMMUNITY}/[category]`} as={`${ROUTE.COMMUNITY}/${category}`} passHref>
        <a className="link near-black">
          <h2 className={h2Class}>
            {name} {link && <span className="ml-auto">⇥</span>}
          </h2>
        </a>
      </Link>
    )
  }
  return (
    <h2 className={h2Class}>
      {name} {link && <i className="ml-auto fas fa-long-arrow-alt-right"/>}
    </h2>
  )
}
