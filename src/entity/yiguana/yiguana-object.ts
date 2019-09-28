import {generate} from 'short-uuid'
import {EYiguanaEntity} from './enum'

export abstract class YiguanaObject {
  public hk = generate()
  protected constructor(public rk: EYiguanaEntity) {

  }

  protected validate() {}
}
