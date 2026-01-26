export default defineNuxtRouteMiddleware(() => {
  const { isDemo } = useFeatures()

  if (isDemo) {
    return navigateTo('/')
  }
})
