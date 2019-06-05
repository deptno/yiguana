import * as Post from '../../packages/yiguana/entity/post'
import {gamePost, muckbangPost, musicPost} from '../data/post'
import {TestGlobal} from '../global'

export function createMukbangPost<T extends TestGlobal>(shared: T) {
  return () => {
    shared.post = Post.create(muckbangPost)
  }
}
export function createMusicPost<T extends TestGlobal>(shared: T) {
  return () => {
    shared.post = Post.create(musicPost)
  }
}
export function createGamePost<T extends TestGlobal>(shared: T) {
  return () => {
    shared.post = Post.create(gamePost)
  }
}
