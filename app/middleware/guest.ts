export default defineNuxtRouteMiddleware((_to, _from) => {
  if (useAuthStore().isAuthenticated) {
    return navigateTo('/')
  }
})
