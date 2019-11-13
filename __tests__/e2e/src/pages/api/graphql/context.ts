export const context = ({req}) => {
  if (req.headers.authorization) {
    return {
      user: JSON.parse(req.headers.authorization)
    }
  }
}
