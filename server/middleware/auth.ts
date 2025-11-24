import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  if (getRequestURL(event).pathname.startsWith('/api/users')) {
    const authToken = getCookie(event, 'auth_token')

    if (!authToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: No auth token',
      })
    }

    try {
      event.context.userId = (
        jwt.verify(authToken, process.env.JWT_SECRET!) as { userId: number }
      ).userId
    } catch {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid token',
      })
    }
  }
})
