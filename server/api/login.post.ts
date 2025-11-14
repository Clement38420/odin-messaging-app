import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Incomplete credentials',
      data: {
        fields: [
          ...(!username ? ['username'] : []),
          ...(!password ? ['password'] : []),
        ],
        message: 'This field is required',
      },
    })
  }

  try {
    const invalidCredentialsError = createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
      data: {
        fields: ['username', 'password'],
        message: 'Username or password is incorrect',
      },
    })

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    })
    if (!user) throw invalidCredentialsError

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw invalidCredentialsError

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
    })

    return sendRedirect(event, '/', 302)
  } catch (error) {
    if (error instanceof H3Error) throw error
    else
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error',
        data: {
          fields: ['general'],
          message: 'Erreur de connexion serveur',
        },
      })
  }
})
