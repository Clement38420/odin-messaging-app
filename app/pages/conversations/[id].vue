<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()
const conversationStore = useConversationsStore()

const conversationId = conversationStore.getCurrentConversationId()

const { data: messages } = await useAsyncData(
  `messages-${conversationId}`,
  () => $api(`/api/conversations/${conversationId}/messages`),
)

const messagesContainer = useTemplateRef('messagesContainer')
function scrollToBottom() {
  if (messagesContainer.value)
    messagesContainer.value.scrollTop = messagesContainer.value?.scrollHeight
}

async function addMessage(message: Message) {
  messages.value = [...(messages.value ?? []), message]

  conversationStore.updateLastMessage(conversationId, message)

  await nextTick()
  scrollToBottom()
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="relative col-span-6 flex h-full flex-col overflow-hidden">
    <div
      ref="messagesContainer"
      class="flex flex-1 flex-col overflow-y-auto p-8"
    >
      <div class="mt-auto flex flex-col gap-2">
        <MessagesMessageCard
          v-for="message in messages ?? []"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>

    <MessagesMessageInput
      :conversation-id="conversationId"
      @message-sent="addMessage"
    />
  </div>
</template>

<style scoped></style>
