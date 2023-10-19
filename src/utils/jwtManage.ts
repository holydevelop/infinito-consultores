export async function desencryptJwt(token: string) {
  const jwt = require('jsonwebtoken')
  const decoded = jwt.decode(token)
  console.log(decoded)
}
