import debug from 'debug'

const logApi = debug('yiguana:api')
const logStore = debug('yiguana:store')

export const logStoreS3 = logStore.extend('s3')
export const logStoreDdb = logStore.extend('ddb')

export const logApiPost = logApi.extend('post')
export const logApiComment = logApi.extend('comment')
export const logApiReply = logApi.extend('reply')

export const logStorePost = logStoreDdb.extend('post')
export const logStoreComment = logStoreDdb.extend('comment')
export const logStoreReply = logStoreDdb.extend('reply')

