<script setup lang="ts">
import type { z } from 'zod'

definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()

const { data: conversations } = await useAsyncData(() =>
  $api('/api/conversations'),
)
const selectedConversationId = ref<number | null>(null)

function updateSelectedConversation(id: number) {
  selectedConversationId.value = id
  const conversation = conversations.value?.find((conv) => conv.id === id)
  if (conversation) {
    conversation.lastSeenAt = new Date().toISOString()
  }
}

function updateLastMessage(
  conversationId: number,
  lastMessage: z.infer<typeof messageBaseSchema>,
) {
  const conversation = conversations.value?.find(
    (conv) => conv.id === conversationId,
  )
  if (conversation) {
    conversation.lastMessage = lastMessage
    if (conversations.value) triggerRef(conversations)
  }
}

function isConversationRead(conversation: ConversationSnippet) {
  if (!conversation.lastMessage) return true
  if (!conversation.lastSeenAt) return false
  return (
    new Date(conversation.lastSeenAt).getTime() >=
    new Date(conversation.lastMessage?.createdAt).getTime()
  )
}
</script>

<template>
  <div class="absolute inset-0 grid grid-cols-8">
    <aside
      class="col-span-2 flex flex-col gap-4 overflow-y-auto border-r border-gray-200 p-8"
    >
      <IndexConvCard
        v-for="conversation in conversations"
        :key="conversation.id"
        :title="conversation.name"
        :last-message="conversation.lastMessage?.content"
        :is-read="
          isConversationRead(conversation) ||
          conversation.id === selectedConversationId
        "
        @click="updateSelectedConversation(conversation.id)"
      />
    </aside>

    <IndexMessages
      v-if="selectedConversationId !== null"
      :conversation-id="selectedConversationId"
      @last-message-updated="updateLastMessage(selectedConversationId, $event)"
    />
  </div>
</template>

<style scoped></style>
