import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { username, password, email } = body

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      username: username,
      password: hashedPassword,
      email: email,
    })

    return sendRedirect(event, '/login', 301)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }
})
