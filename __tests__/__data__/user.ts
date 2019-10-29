import {Member, NonMember} from '../../src/entity/user'

export const member_a: Member = {
  id: 'a',
  name: 'a gun',
  ip: '0.0.0.1',
}
export const member_b: Member = {
  id: 'b',
  name: 'b gun',
  ip: '0.0.0.2',
}
export const member_c: Member = {
  id: 'c',
  name: 'c gun',
  ip: '0.0.0.3',
}
export const member_d: Member = {
  id: 'd',
  name: 'd gun',
  ip: '0.0.0.3',
}
export const member_e: Member = {
  id: 'e',
  name: 'e gun',
  ip: '0.0.0.3',
}
export const member_f: Member = {
  id: 'f',
  name: 'f gun',
  ip: '0.0.0.3',
}
export const non_member_a: NonMember = {
  name: 'non a',
  pw: 'pw',
  ip: '0.0.0.10',
}
export const non_member_without_pw: NonMember = {
  name: 'non pw',
  pw: '',
  ip: '0.0.0.0',
}
