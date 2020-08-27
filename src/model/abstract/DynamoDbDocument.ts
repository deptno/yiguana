export abstract class DynamoDbDocument {
  protected _data: string[]
  protected constructor(document: YiguanaDocument.Document) {
    this._data = document.rk.split('#')
  }
}
