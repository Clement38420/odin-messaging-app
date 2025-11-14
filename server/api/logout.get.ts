export default defineEventHandler(async (event) => {
  deleteCookie(event, 'auth_token')
  return sendRedirect(event, '/login', 301)
})
