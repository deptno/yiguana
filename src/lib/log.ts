import debug from 'debug'

const logApi = debug('yiguana:api')
const logStore = debug('yiguana:store')

export const logAsserts = debug('yiguana:assert')

export const logStoreS3 = logStore.extend('s3')
export const logStoreDdb = logStore.extend('ddb')

export const logApiCommon = logApi.extend('common')
export const logApiPost = logApi.extend('post')
export const logApiComment = logApi.extend('comment')
export const logApiReply = logApi.extend('reply')
export const logApiAdmin = logApi.extend('administrator')
export const logApiUser = logApi.extend('user')

export const logApiAdminReport = logApiAdmin.extend('report')
export const logApiAdminAggReport = logApiAdmin.extend('aggReport')

export const logApiUserPost = logApiUser.extend('post')
export const logApiUserComment = logApiUser.extend('comment')
export const logApiUserReply = logApiUser.extend('reply')
export const logApiUserReport = logApiUser.extend('report')

