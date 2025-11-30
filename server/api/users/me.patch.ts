export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userData = validateSchema(userProfileSchema, body)

  try {
    await db
      .update(users)
      .set(userData)
      .where(eq(users.id, event.context.user.id))

    return sendRedirect(event, '/login', 301)
  } catch (error) {
    errorHandler(error)
  }
})
