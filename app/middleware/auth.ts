export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { status } = await useFetch<{ user: UserProfile }>('/api/users/me')

  if (
    status.value === 'error' &&
    to.path !== '/login' &&
    to.path !== '/register'
  ) {
    return navigateTo('/login')
  }

  if (
    status.value === 'success' &&
    (to.path === '/login' || to.path === '/register')
  ) {
    return navigateTo('/')
  }
})
