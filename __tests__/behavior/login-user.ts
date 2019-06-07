import {ddbClient, tableName} from './env'
import * as User from '../../packages/yiguana/entity/user'
import {TestGlobal} from '../global'
import * as Board from '../../packages/yiguana/entity/board'

export function loginuser<T extends TestGlobal>(shared: T, boardName: string) {
  return () => {
    shared.board = Board.create({
      name  : boardName,
      client: ddbClient,
      tableName
    })
  }
}
