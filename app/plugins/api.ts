import type { $Fetch, NitroFetchRequest } from 'nitropack'

export default defineNuxtPlugin((nuxtApp) => {
  const headers = useRequestHeaders(['cookie'])

  const api = $fetch.create({
    onRequest({ options }) {
      options.credentials = 'include'

      if (import.meta.server) {
        if (headers.cookie) {
          options.headers = new Headers(options.headers)
          options.headers.set('cookie', headers.cookie)
        }
      }
    },
    async onResponseError({ request, response }) {
      if (response.status === 401) {
        if (request.toString().includes('/login')) {
          return
        }

        const currentPath = useRouter().currentRoute.value.path
        if (currentPath === '/login' || currentPath === '/register') {
          return
        }

        useAuthStore().clearUser()
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  }) as $Fetch<unknown, NitroFetchRequest>

  return {
    provide: {
      api,
    },
  }
})
