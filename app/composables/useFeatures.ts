export const useFeatures = () => {
  const config = useRuntimeConfig()

  const isDemo = config.public.appMode === 'demo'

  return {
    isDemo,
    canCreateAccount: !isDemo,
    canSendMessage: !isDemo,
    canCreateConversation: !isDemo,
    canLeaveConversations: !isDemo,
    canEditProfile: !isDemo,
  }
}
