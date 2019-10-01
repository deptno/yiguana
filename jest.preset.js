const merge = require('merge')
const ts = require('ts-jest/jest-preset')
const dynamodb = require('@shelf/jest-dynamodb/jest-preset')

module.exports = merge.recursive(ts, dynamodb)

