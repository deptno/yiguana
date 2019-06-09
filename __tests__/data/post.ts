import {PostInput} from '../../packages/yiguana/entity/post'
import {deptnoUserInput} from './user'

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
    id       : 'userId',
    name     : 'Bonggyun Lee',
    thumbnail: 'https://thumb'
  }
}
export const deptnoGamePost: PostInput = {
  ...gamePost,
  author  : {
    ...deptnoUserInput,
    thumbnail: 'https://thumb'
  }
}
export const deptnoMusicPost: PostInput = {
  ...musicPost,
  author  : {
    ...deptnoUserInput,
    thumbnail: 'https://thumb'
  }
}
