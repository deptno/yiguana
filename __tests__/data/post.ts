import {PostInput} from '../../packages/yiguana/entity/post'

export const muckbangPost: PostInput = {
  title   : 'mukbang post',
  content : `content`,
  category: 'mukbang',
  author  : {
    id       : 'userId',
    name     : 'userName',
    thumbnail: 'https://thumb'
  }
}
export const musicPost: PostInput = {
  title   : 'music post',
  content : `content`,
  category: 'music',
  author  : {
    id       : 'userId',
    name     : 'userName',
    thumbnail: 'https://thumb'
  }
}
export const gamePost: PostInput = {
  title   : 'game post',
  content : `content`,
  category: 'game',
  author  : {
    id       : 'deptno',
    name     : 'Bonggyun Lee',
    thumbnail: 'https://thumb'
  }
}
