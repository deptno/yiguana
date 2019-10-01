module.exports = {
  'bail'           : true,
  'preset'         : './jest.preset.js',
  'testEnvironment': 'node',
  'testMatch'      : [
    '**/?(*.)(spec|test).ts?(x)',
    '__tests__/**/*.ts?(x)'
  ],
  'globals'        : {
    'TZ'                    : 'utc',
    'YIGUANA_ENCRYPTION_KEY': 'dummy-encryption-key-24-length'
  },
  displayName: {
    name: 'yiguana',
    color: 'blue',
  }
}