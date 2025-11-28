import type { z } from 'zod'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<(z.infer<typeof userProfileSchema> & { id: number }) | null>(
    null,
  )

  const isAuthenticated = computed(() => !!user.value)

  function getUserId() {
    return user.value?.id
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
  }
})
