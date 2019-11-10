import {DynamoDbKey} from '@deptno/dynamodb/dist/key'

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
  posts = 'posts',
  postsByCategory = 'postsByCategory',
  comments = 'comments',
  byUser = 'byUser',
  reports = 'reports',
  RkLike = 'rk-like-index',
}
