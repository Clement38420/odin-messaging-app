import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userData = validateSchema(userLoginSchema, body)

  try {
    const invalidCredentialsError = createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
      data: {
        errors: [
          { field: 'username', message: 'Invalid credentials.' },
          { field: 'password', message: 'Invalid credentials.' },
        ],
      },
    })

    const user = await db.query.users.findFirst({
      where: eq(users.username, userData.username),
    })
    if (!user) throw invalidCredentialsError

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    )
    if (!isPasswordValid) throw invalidCredentialsError

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
    )
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
    })

    return sendRedirect(event, '/', 302)
  } catch (error) {
    errorHandler(error)
  }
})
