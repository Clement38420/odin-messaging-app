export default defineEventHandler(async (event) => {
  const authToken = getCookie(event, 'auth_token')

  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No auth token',
    })
  }

  try {
    const userId = verifyUserToken(authToken)

    const user = await getUserProfileById(userId)
    if (!user)
      throw createError({ statusCode: 404, statusMessage: 'User not found' })

    return user
  } catch (error) {
    if (error instanceof H3Error) throw error
    else
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid token',
      })
  }
})
