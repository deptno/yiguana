import {EType} from '../common'

export function extractType(key: string) {
  return key.split('#')[0] as EType
}
