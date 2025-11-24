export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    await $fetch('/api/users/me')

    if (to.path === '/login' || to.path === '/register') {
      return navigateTo('/')
    }
  } catch {
    if (to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login')
    }
  }
})
