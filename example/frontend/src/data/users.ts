import {ERole} from '../../../../lib/entity/user'

const admin = {
  id: 'admin',
  name: 'administrator',
  ip: '0.0.0.0',
  photo: 'https://avatars2.githubusercontent.com/u/1342004?s=88&v=4',
  role: ERole.admin
}
const member_a = {
  id: 'a',
  name: 'jhgu',
  ip: '0.0.0.1',
  photo: 'https://avatars2.githubusercontent.com/u/10482833?s=88&v=4',
}
const member_b = {
  id: 'b',
  name: 'bglee',
  ip: '0.0.0.2',
  photo: 'https://avatars0.githubusercontent.com/u/1223020?s=88&v=4',
}
const member_c = {
  id: 'c',
  name: 'c gun',
  ip: '0.0.0.3',
}
const member_d = {
  id: 'd',
  name: 'd gun',
  ip: '0.0.0.3',
}
const member_e = {
  id: 'e',
  name: 'shlee',
  ip: '0.0.0.3',
  photo: 'https://avatars0.githubusercontent.com/u/42666492?s=88&v=4',
}
const member_f = {
  id: 'f',
  name: 'jhso',
  ip: '0.0.0.3',
  photo: 'https://avatars0.githubusercontent.com/u/31269303?s=88&v=4',
}
const non_member_a = {
  name: 'non a',
  pw: 'pw',
  ip: '0.0.0.10',
}
const non_member_without_pw = {
  name: 'non pw',
  pw: '',
  ip: '0.0.0.0',
}

export const users = [
  admin,
  member_a,
  member_b,
  member_c,
  member_d,
  member_e,
  member_f,
  non_member_a,
  non_member_without_pw,
]