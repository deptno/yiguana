export abstract class DynamoDbDocument<T extends DynamoDB.Document> {
  protected _data: string[]
  protected constructor(public readonly _document: T) {
    this._document = Object.freeze(_document)
    this._data = _document.rk.split('#')
  }
}
