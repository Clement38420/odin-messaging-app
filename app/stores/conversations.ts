export const useConversationsStore = defineStore('conversations', () => {
  const { $api } = useNuxtApp()

  const conversations = ref<ConversationSnippet[]>([])

  async function fetchConversations() {
    if (conversations.value.length > 0) return

    const data = await $api('/api/conversations')
    conversations.value = data || []

    sortConversations()
  }

  function updateLastMessage(conversationId: number, message: Message) {
    const conversation = conversations.value.find(
      (c) => c.id === conversationId,
    )
    if (conversation) {
      conversation.lastMessage = message
      conversation.lastSeenAt = new Date().toISOString()

      sortConversations()
    }
  }

  function isRead(conversation: ConversationSnippet) {
    if (conversation.id === getCurrentConversationId()) return true
    if (!conversation.lastMessage) return true
    if (!conversation.lastSeenAt) return false
    return (
      new Date(conversation.lastSeenAt).getTime() >=
      new Date(conversation.lastMessage.createdAt).getTime()
    )
  }

  function sortConversations() {
    conversations.value.sort((a, b) => {
      const dateA = new Date(a.lastMessage?.createdAt || 0).getTime()
      const dateB = new Date(b.lastMessage?.createdAt || 0).getTime()
      return dateB - dateA
    })
  }

  function clearConversations() {
    conversations.value = []
  }

  function getCurrentConversationId() {
    return useRoute().params.id ? Number(useRoute().params.id) : null
  }

  return {
    conversations,
    fetchConversations,
    updateLastMessage,
    clearConversations,
    isRead,
    getCurrentConversationId,
  }
})
