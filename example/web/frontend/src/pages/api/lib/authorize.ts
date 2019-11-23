import {NextApiRequest, NextApiResponse} from 'next'
import {User} from '../../../../../../../src/entity/user'

export function authorize(req: NextApiRequest, res: NextApiResponse) {
  try {
    return {
      ...getUser(req.headers.authorization),
      ip: req.connection.remoteAddress,
    }
  } catch (e) {
    if (e.message === EAuthorizeErrorCode.unauthorized) {
      res
        .status(401)
        .send({error: EAuthorizeErrorCode.unauthorized})
    }
    if (e.message === EAuthorizeErrorCode.forbidden) {
      res
        .status(403)
        .send({error: EAuthorizeErrorCode.forbidden})
    }
  }
}
export function isMember(user: User) {
  if (user) {
    if ('id' in user) {
      return true
    }
  }
  return false
}
function getUser(authorization) {
  if (!authorization) {
    throw new Error(EAuthorizeErrorCode.unauthorized)
  }

  try {
    return JSON.parse(authorization)
  } catch (e) {
    console.error(e)
    throw new Error(EAuthorizeErrorCode.forbidden)
  }
}

export enum EAuthorizeErrorCode {
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
}
