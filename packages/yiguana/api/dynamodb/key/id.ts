import {generate} from 'short-uuid'

export function createHashKey() {
  return generate()
}
