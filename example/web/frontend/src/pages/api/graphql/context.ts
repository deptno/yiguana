import {Member} from '../../../../../../../src/entity/user'

export const context = ({req, event}) => {
  if (event) {
    return lambda(event)
  }
  return nextjs(req)
}

const lambda = event => {
  const {headers, requestContext: {identity: {sourceIp: ip}}} = event
  const {Authorization, authorization = Authorization} = headers

  if (authorization) {
    console.log('authorization', authorization)
    const user = JSON.parse(authorization) as Member
    console.log('user', user)
    return {
      user: {
        ...user,
        ip
      }
    }
  }
}
const nextjs = req => {
  console.log(req)
  const {Authorization, authorization = Authorization} = req.headers

  if (authorization) {
    const user = JSON.parse(req.headers.authorization) as Member

    return {
      user,
    }
  }
}
