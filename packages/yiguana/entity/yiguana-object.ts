import {generate} from 'short-uuid'
import {EYiguanaEntity} from './enum'

export abstract class YiguanaObject {
  private hk = generate()

  protected constructor(private rk: EYiguanaEntity) {

  }

  protected validate() {}
}
