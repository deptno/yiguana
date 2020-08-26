import {Member, NonMember, User, UserMeta} from '../../../../../../lib/entity'

export const context = (req) => {
  return {
    getUser: getUser(req),
  }
}

const getUser = (req) =>
  (low?: NonMember): User => {
    return {
      ...low,
      ...fromReq(req),
    }
  }

const fromReq = ({req, event}): UserMeta | User => {
  if (event) {
    return lambda(event)
  }
  return nextjs(req)
}

const lambda = event => {
  const {headers, requestContext: {identity: {sourceIp: ip}}} = event
  const {Authorization, authorization = Authorization} = headers

  if (authorization) {
    const user = JSON.parse(authorization) as Member

    return {
      ...user,
      ip,
    }
  }

  return {
    ip,
  }
}
const nextjs = req => {
  const {Authorization, authorization = Authorization} = req.headers
  const ip = req.connection.remoteAddress

  if (authorization) {
    const user = JSON.parse(req.headers.authorization) as Member

    return {
      ...user,
      ip,
    }
  }

  return {
    ip,
  }
}
