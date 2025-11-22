import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { confirmPassword, ...userData } = validateSchema(
    userRegisterSchema,
    body,
  )

  try {
    userData.password = await bcrypt.hash(userData.password, 10)

    await db.insert(users).values(userData)

    return sendRedirect(event, '/login', 301)
  } catch (error) {
    errorHandler(error)
  }
})
