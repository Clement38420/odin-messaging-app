export const useAuthStore = defineStore('auth', () => {
  const user = ref<(UserProfile & { id: number }) | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  function getUserId() {
    return user.value?.id
  }

  function getUserUsername() {
    return user.value?.username
  }

  function getUserProfile() {
    return user.value
  }

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
    getUserId,
    getUserUsername,
    getUserProfile,
  }
})
