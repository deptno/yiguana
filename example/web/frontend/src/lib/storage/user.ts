import * as R from 'ramda'
import {get, set} from './storage'
import {User} from '../../../../../../lib/entity'

export const getUser = () => {
  const data = get('user')

  if (data) {
    return JSON.parse(data) as User
  }
}
export const getUserId = () => {
  const user = getUser()

  if (user) {
    if ('id' in user) {
      return user.id
    }
  }
}
export const getUserName = () => {
  const user = getUser()

  if (user) {
    return user.name
  }
}
export const isMember = (user) => {
  if (user) {
    if (user['id']) {
      return true
    }
  }
  return false
}
export const setUser = (user: User) => {
  if (user) {
    set('user', JSON.stringify(user))
  }
}
