import jwt from 'jsonwebtoken'

export function verifyUserToken(token: string) {
  return (jwt.verify(token, process.env.JWT_SECRET!) as UserJWTPayload).userId
}
