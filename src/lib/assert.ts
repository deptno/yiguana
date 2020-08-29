import {logAsserts} from './log'
import {RoleType, ErrorType, EntityType} from '../enum'

// todo: 에러메시지 이넘 처리

function asserts(condition, message?: string): asserts condition {
  if (!condition) {
    log(message)
    throw new Error(message)
  }
}

export function assertNotEmptyString(value, message = ErrorType.empty_string): asserts value is string {
  asserts(typeof value === 'string', ErrorType.not_string)
  asserts(value, message)
}

// Yiguana.User
export function assertsUser(user: Yiguana.User): asserts user is Yiguana.User {
  asserts(user.ip, ErrorType.user_must_have_ip)
  asserts(user.name, ErrorType.user_must_have_name)
}
export function assertsNotMember(user: Yiguana.User): asserts user is Yiguana.NonMember {
  assertsUser(user)
  asserts('pw' in user, ErrorType.not_member_must_have_pw)
  assertNotEmptyString(user.pw, ErrorType.pw_must_not_empty)
}
export function assertsMember(user: Yiguana.User): asserts user is Yiguana.Member {
  assertsUser(user)
  asserts('id' in user, ErrorType.login_is_required)
}
export function assertsMemberOrNot(user: Yiguana.User): asserts user is Yiguana.User {
  if ('id' in user) {
    assertsMember(user)
  } else {
    assertsNotMember(user)
  }
}
export function assertsAdmin(user: Yiguana.User): asserts user is Yiguana.AdminMember {
  assertsMember(user)
  asserts(user.role === RoleType.admin, ErrorType.admin_access_only)
}

// store layer
export function assertPostOrComment(input: Yiguana.PostDocument | Yiguana.CommentDocument | Yiguana.ReplyDocument)
  : asserts input is Yiguana.PostDocument | Yiguana.CommentDocument | Yiguana.ReplyDocument {
  asserts(
    input.rk === EntityType.Post || input.rk === EntityType.Comment,
    ErrorType.post_comment_reply_are_supported,
  )
}
export function assertMaxLength(input: string, maxLength: number): asserts input {
  assertNotEmptyString(input)
  asserts(input.length <= maxLength, ErrorType.assert_max_length)
}

const log = logAsserts.extend('asserts')

