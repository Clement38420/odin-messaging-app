export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function fetchUser() {
    try {
      user.value = await useNuxtApp().$api('/api/users/me')
    } catch {
      user.value = null
    }
  }

  function clearUser() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    fetchUser,
    clearUser,
  }
})
