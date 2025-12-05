<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()
const conversationsStore = useConversationsStore()
const route = useRoute()

useHead(() => ({
  title: `DASH - ${conversationsStore.getCurrentConversation()?.name || 'Not named'}`,
}))

const conversationId = computed(() => Number(route.params.id))

const { data: messages, error } = await useAsyncData(
  `messages-${conversationId.value}`,
  () => $api(`/api/conversations/${conversationId.value}/messages`),
)

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage:
      error.value.statusMessage || 'An error occurred while fetching messages',
  })
}

const messagesContainer = useTemplateRef('messagesContainer')
function scrollToBottom() {
  if (messagesContainer.value)
    messagesContainer.value.scrollTop = messagesContainer.value?.scrollHeight
}

async function addMessage(message: ConversationMessage) {
  messages.value = [...(messages.value ?? []), message]

  conversationsStore.updateLastMessage(conversationId!, message)

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
