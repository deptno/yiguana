import {User} from './entity/user'

export type ApiInput<T> = {
  data: T
}
export type UserApiInput<T> = {
  data: T
  user: User
}