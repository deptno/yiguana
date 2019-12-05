import {ValidationError} from '../entity/error'
import {ERole, Member, MemberAdmin, NonMember, User} from '../entity/user'
import {logAsserts} from './log'

function asserts(condition, message?: string): asserts condition {
  if (!condition) {
    log(message)
    throw new ValidationError(message)
  }
}

export function assertNotEmptyString(value: string, message = 'empty string'): asserts value is string {
  asserts(typeof value === 'string', 'not string')
  asserts(value, message)
}

// User
export function assertsUser(user: User): asserts user is User {
  asserts(user.ip, 'user must have ip')
  asserts(user.name, 'user must have name')
}
export function assertsNotMember(user: User): asserts user is NonMember {
  assertsUser(user)
  asserts('pw' in user, 'not member must have pw')
  assertNotEmptyString(user.pw, 'pw must not empty')
}
export function assertsMember(user: User): asserts user is Member {
  assertsUser(user)
  asserts('id' in user, 'login is required')
}
export function assertsMemberOrNot(user: User): asserts user is User {
  if ('id' in user) {
    assertsMember(user)
  } else {
    assertsNotMember(user)
  }
}
export function assertsAdmin(user: User): asserts user is MemberAdmin {
  assertsMember(user)
  asserts(user.role === ERole.admin, 'admin access only')
}

const log = logAsserts.extend('asserts')
