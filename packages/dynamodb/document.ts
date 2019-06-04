import {DynamoDB} from 'aws-sdk'
import {DocumentClient} from 'aws-sdk/clients/dynamodb'
import {always, compose, omit} from 'ramda'

/**
 * Omit unacceptable values and transform Set to DocumentClient.createSet
 * @param obj
 * @param {SetTransformer} ifSet
 * @returns {any}
 */
export const dynamodbDoc = <T>(obj: T, ifSet: SetTransformer = defaultSetTransformer) => {
  const omitKeys = []
  const clone = {...obj}

  for (const key in clone) {
    const value = clone[key]
    if (isOmitValue(value)) {
      omitKeys.push(key)
    } else {
      clone[key] = dynamodbValue(value, ifSet)
    }
  }
  return omit(omitKeys, clone) as T
}
/**
 * Recover javascript data type from DynamoDB data type
 * @param value
 * @param {SetTransformer} ifSet
 * @returns {any}
 */
export const dynamodbValue = (value, ifSet: SetTransformer = defaultSetTransformer) => {
  if (value instanceof Set) {
    return ifSet(value)
  } else if (value instanceof Date) {
    return value.getTime()
  } else if (Array.isArray(value)) {
    return value
      .filter(x => !isOmitValue(x))
      .map(value => dynamodbValue(value, ifSet))
  } else if (value === null) {

  } else if (typeof value === 'object') {
    return dynamodbDoc(value, ifSet)
  }
  return value
}
export const jsDoc = <T>(obj: T, transform = setTo): T => {
  const omitKeys: string[] = []
  const clone = {} as any

  for (const key in obj) {
    clone[key] = jsValue(obj[key], transform)
  }

  return omit(omitKeys, clone) as T
}
export const jsValue = (value, transform) => {
  if (value.wrapperName === 'Set') {
    return transform(value.values)
  }
  return value
}

const setTo = <T>(data: T[]): any => new Set<T>(data)
const getDdbClient = always(new DynamoDB.DocumentClient())
const defaultSetTransformer: SetTransformer = compose(getDdbClient().createSet, Array.from)
const isOmitValue = (value) => {
  if (!value) {
    if (value === null) {
      return true
    }
    if (value === undefined) {
      return true
    }
    if (typeof value === 'string') {
      return true
    }
    if (typeof value === 'number') {
      if (isNaN(value)) {
        return true
      }
    }
    //  } else if (Array.isArray(value)) {
    //    if (value.length === 0) {
    //      return true
    //    }
  } else if (value instanceof Set) {
    if (value.size === 0) {
      return true
    }
  }
}
interface SetTransformer {
  (fx: Set<DocumentClient.DynamoDbSet>): DocumentClient.DynamoDbSet
}

