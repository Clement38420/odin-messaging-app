export default defineEventHandler((event) => {
  if (process.env.APP_MODE !== 'demo') return

  const method = event.method
  const url = event.path

  const protectedRoutes = [
    { method: 'POST', path: '/api/register' },
    { method: 'POST', path: '/api/conversations' },
    { method: 'PATCH', path: '/api/users' },
    { method: 'DELETE', path: '/api' },
  ]

  const isProtected = protectedRoutes.some(
    (r) => method === r.method && url.startsWith(r.path),
  )

  if (isProtected) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Action disabled in demo mode',
    })
  }
})
