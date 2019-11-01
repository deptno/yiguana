import {DynamoDbKey} from '@deptno/dynamodb/dist/key'
import {util} from '@deptno/dynamodb'

class YiguanaIndex<H, R> {
  constructor(
    public readonly indexName: string,
    public hash: DynamoDbKey<H>,
    public range?: DynamoDbKey<R>
  ) {

  }
}

// TODO EIndexName 직접 참조는 지속적으로 줄이고 YiguanaIndex 를 만들어서 참조
export enum EIndexName {
  RkCategory = 'rk-category-index',
  BoardOrder = 'board-order-index',
  PostOrder = 'postId-order-index',
  Comment = 'postId-createdAt-index',
  Replies = 'replies',
  ByUser = 'by-user',
  RkLike = 'rk-like-index',
}

export const rkCategoryIndex = new YiguanaIndex<{ a: number }, {b: number}>(
  EIndexName.RkCategory,
  util.createKey(['a'], {a: v => parseInt(v)}),
)

