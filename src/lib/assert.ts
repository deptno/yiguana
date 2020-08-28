import {logAsserts} from './log'

// todo: 에러메시지 이넘 처리

function asserts(condition, message?: string): asserts condition {
  if (!condition) {
    log(message)
    throw new Error(message)
  }
}

export function assertNotEmptyString(value, message = EYiguanaError.empty_string): asserts value is string {
  asserts(typeof value === 'string', EYiguanaError.not_string)
  asserts(value, message)
}

// Yiguana.User
export function assertsUser(user: Yiguana.User): asserts user is Yiguana.User {
  asserts(user.ip, EYiguanaError.user_must_have_ip)
  asserts(user.name, EYiguanaError.user_must_have_name)
}
export function assertsNotMember(user: Yiguana.User): asserts user is Yiguana.NonMember {
  assertsUser(user)
  asserts('pw' in user, EYiguanaError.not_member_must_have_pw)
  assertNotEmptyString(user.pw, EYiguanaError.pw_must_not_empty)
}
export function assertsMember(user: Yiguana.User): asserts user is Yiguana.Member {
  assertsUser(user)
  asserts('id' in user, EYiguanaError.login_is_required)
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
  asserts(user.role === Yiguana.RoleType.admin, EYiguanaError.admin_access_only)
}

// store layer
export function assertPostOrComment(input: Yiguana.PostDocument | Yiguana.CommentDocument | Yiguana.ReplyDocument)
  : asserts input is Yiguana.PostDocument | Yiguana.CommentDocument | Yiguana.ReplyDocument {
  asserts(
    input.rk === Yiguana.EntityType.Post || input.rk === Yiguana.EntityType.Comment,
    EYiguanaError.post_comment_reply_are_supported,
  )
}
export function assertMaxLength(input: string, maxLength: number): asserts input {
  assertNotEmptyString(input)
  asserts(input.length <= maxLength, EYiguanaError.assert_max_length)
}

const log = logAsserts.extend('asserts')

export enum EYiguanaError {
  assert_max_length = 'assert max length 300',
  login_is_required = 'login is required',
  not_member_must_have_pw = 'not member must have pw',
  pw_must_not_empty = 'pw must not empty',
  user_must_have_ip = 'user must have ip',
  user_must_have_name = 'user must have name',
  empty_string = 'empty string',
  not_string = 'not string',
  admin_access_only = 'admin access only',
  post_comment_reply_are_supported = `{post|comment|reply} are supported`,
}

