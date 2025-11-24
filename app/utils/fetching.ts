export async function fetcher<T extends object>(url: string, options?: T) {
  try {
    return await $fetch(url, options)
  } catch (error) {
    if (
      error instanceof FetchError &&
      error.data.statusCode === 401 &&
      (error.data.statusMessage === 'Unauthorized: No auth token' ||
        error.data.statusMessage === 'Unauthorized: Invalid token')
    ) {
      alert('Your session has expired. Please relogin.')
      navigateTo('/login')
    } else {
      throw error
    }
  }
}
