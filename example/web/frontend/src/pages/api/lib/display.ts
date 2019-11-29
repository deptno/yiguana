import {Post, Comment, Report, EEntityStatus} from '../../../../../../../lib'

export const overrideResponseByStatus = (response: { items: ContentEntity[] }) => {
  console.log({response: response.items})
  return {
    ...response,
    items: response.items.map(displayItem),
  }
}
const displayItem = (item: ContentEntity) => {
  const content = getContentByStatus(item.status)

  if (content) {
    if ('title' in item) {
      return {...item, content, title: content}
    }
    return {...item, content}
  }
  return item
}
const getContentByStatus = (status?: EEntityStatus) => {
  switch (status) {
    case EEntityStatus.requestedBlock:
      return '신고가 접수되었습니다.'
    case EEntityStatus.blockedBySystem:
      return '규칙에 의해 차단되었습니다.'
    case EEntityStatus.deletedByUser:
      return '작성자에 의해 삭제되었습니다.'
    case EEntityStatus.deletedByAdmin:
      return '관리자에 의해 삭제되었습니다.'
    case EEntityStatus.deletedBySystem:
      return '시스템에 의해 삭제되었습니다.'
    case EEntityStatus.inAudit:
      return '심사가 진행중입니다.'
  }
}

type ContentEntity = Post | Comment | Report
