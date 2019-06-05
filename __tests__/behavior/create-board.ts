import {ddbClient, tableName} from './env'
import * as Board from '../../packages/yiguana/entity/board'
import {TestGlobal} from '../scenario'

export function createBoard<T extends TestGlobal>(shared: T, boardName: string) {
  return () => {
    shared.board = Board.create({
      name  : boardName,
      client: ddbClient,
      tableName
    })
  }
}
