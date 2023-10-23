export async function decryptJwt(token: string){
  const jwt = require('jsonwebtoken')
  const decoded = await jwt.decode(token)
  return decoded
}
