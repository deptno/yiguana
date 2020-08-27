export abstract class DynamoDbDocument {
  protected _data: string[]
  protected constructor(public readonly _document: Yiguana.Document) {
    this._document = Object.freeze(_document)
    this._data = _document.rk.split('#')
  }
}
