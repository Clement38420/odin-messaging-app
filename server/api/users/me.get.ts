export default defineEventHandler(async (event) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, event.context.user.id),
      columns: {
        id: true,
        ...Object.fromEntries(
          Object.keys(userProfileSchema.shape).map((field) => [field, true]),
        ),
      },
    })
    if (!user)
      throw createError({ statusCode: 404, statusMessage: 'User not found' })

    return user
  } catch (error) {
    errorHandler(error)
  }
})
