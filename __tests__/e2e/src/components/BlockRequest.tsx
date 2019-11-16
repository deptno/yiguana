import React, {FunctionComponent} from 'react'

export const BlockRequest: FunctionComponent<Props> = props => {
  return (
   <form className="flex flex-column" onSubmit={(e) => {
     e.preventDefault()
     const elReason: HTMLTextAreaElement = e.currentTarget.elements.namedItem('reason') as any
     console.log(elReason.value)
   }}>
     신고하기
     <textarea name="reason">

     </textarea>
     <button className="pa2 link near-black dib white bg-hot-pink mh2 nowrap pointer hover-bg-blue">
       <span className="ml2">신고</span>
     </button>
   </form>
 )
}

type Props = {

}