import {Member} from '../../../../../../../src/entity/user'

export const context = ({req, event}) => {
  if (req) {
    // next.js
    if (req.headers.authorization) {
      return {
        user: JSON.parse(req.headers.authorization) as Member
      }
    }
  }
  if (event) {
    // lambda
    if (event.headers.authorization) {
      return {
        user: req.headers.authorization as Member
      }
    }
  }
}
