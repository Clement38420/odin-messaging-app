export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (id === event.context.user.id) {
    return sendRedirect(event, '/api/users/me', 301)
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: Object.fromEntries(
        Object.keys(userProfileSchema.shape).map((field) => [field, true]),
      ),
    })
    if (!user)
      throw createError({ statusCode: 404, statusMessage: 'User not found' })

    return user
  } catch (error) {
    handleError(error)
  }
})
