import {Board} from './board'

export function login(params: LoginInput) {
  const {board, ...userInput} = params

  board.database.engine.login(params)
}
export type User = {
  id: string
  name: string
  thumbnail: string
  userId: User['id'] // GSI PK 필요한지 확인
  login: number
}
export type LoginInput = {
  board: Board
} & Pick<User, 'id' | 'name' | 'thumbnail'>
