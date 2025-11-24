export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    if (import.meta.server) {
      const headers = useRequestHeaders(['cookie'])
      await $fetch('/api/users/me', { headers })
    } else {
      await $fetch('/api/users/me')
    }

    if (to.path === '/login' || to.path === '/register') {
      return navigateTo('/')
    }
  } catch {
    if (to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login')
    }
  }
})
