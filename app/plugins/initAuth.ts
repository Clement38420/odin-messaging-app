export default defineNuxtPlugin(async (_nuxtApp) => {
  const authStore = useAuthStore()

  await authStore.fetchUser()
})
