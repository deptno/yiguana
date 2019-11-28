import {ValidationError} from '../entity/error'
import {Member, User} from '../entity/user'
import {logAsserts} from './log'

function asserts(condition, message?: string): asserts condition {
  if (!condition) {
    log(message)
    throw new ValidationError(message)
  }
}

export function assertNotEmptyString(value: string): asserts value is string {
  asserts(typeof value === 'string', 'not string')
  asserts(value, 'empty string')
}

// User
function assertsUser(user: User): asserts user is User {
  asserts(user.ip, 'user must have ip')
  asserts(user.name, 'user must have name')
}
export function assertsNotMember(user: User): asserts user is User {
  assertsUser(user)
  asserts('pw' in user, 'not member must have pw')
}
export function assertsMember(user: User): asserts user is Member {
  // 과도하게 퍼포먼스만 떨어질 수 있다고 생각되나 일단 검증
  assertsUser(user)
  asserts('id' in user, 'login is required')
}

const log = logAsserts.extend('asserts')
