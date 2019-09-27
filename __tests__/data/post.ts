import {Post} from '../../packages/yiguana/entity'
//import {Post} from '../../packages/yiguana/api/dynamodb/post'

export const muckbangPost: Post = {
  board: 'ent',
  title: 'mukbang post',
  contentUrl: 's3://uri',
  category: 'mukbang',
  createdAt: '2019-09-27T15:27:35.098Z',
  ip: '0.0.0.0',
  author: {
    id: 'userId',
    name: 'userName',
    thumbnail: 'https://thumb',
  },
}
export const musicPost: Post = {
  board: 'ent',
  title: 'music post',
  contentUrl: 's3://uri',
  category: 'music',
  createdAt: '2019-09-27T15:27:35.098Z',
  ip: '0.0.0.0',
  author: {
    id: 'userId',
    name: 'userName',
    thumbnail: 'https://thumb',
  },
}
export const gamePost: Post = {
  board: 'ent',
  title: 'game post',
  contentUrl: 's3://uri',
  category: 'game',
  createdAt: '2019-09-27T15:27:35.098Z',
  ip: '0.0.0.0',
  author: {
    id: 'userId',
    name: 'Bonggyun Lee',
    thumbnail: 'https://thumb',
  },
}
export const deptnoGamePost: Post = {
  ...gamePost,
  author: {
    id: 'deptno',
    name: 'Bonggyun Lee',
    thumbnail: 'https://thumb',
  },
}
export const deptnoMusicPost: Post = {
  ...musicPost,
  author: {
    id: 'deptno',
    name: 'Bonggyun Lee',
    thumbnail: 'https://thumb',
  },
}
