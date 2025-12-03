import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const userData = validateSchema(userLoginSchema, body)

  try {
    const invalidCredentialsError = new InputValidationError([
      {
        field: 'username',
        message: 'Invalid username or password',
        rule: 'invalid_credentials',
      },
      {
        field: 'password',
        message: 'Invalid username or password',
        rule: 'invalid_credentials',
      },
    ])

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
    handleError(error)
  }
})
