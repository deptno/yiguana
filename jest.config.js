module.exports = {
  bail           : true,
  preset         : '@shelf/jest-dynamodb',
  testEnvironment: 'node',
  testMatch      : [
    '**/?(*.)(spec|test).ts?(x)',
    '__tests__/**/*.ts?(x)'
  ],
  testSequencer: './jest.sequencer.js',
  globals        : {
    'TZ'                    : 'utc',
    'YIGUANA_ENCRYPTION_KEY': 'dummy-encryption-key-24-length',
    'DEBUG': 'yiguana:*'
  },
  displayName      : {
    name : 'yiguana',
    color: 'blue',
  }
}