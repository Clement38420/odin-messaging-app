<script setup lang="ts">
const emit = defineEmits<{
  (e: 'last-message-updated', message: Message): void
}>()

const props = defineProps<{
  conversationId: number
}>()

const { $api } = useNuxtApp()

const messagesContainer = useTemplateRef('messagesContainer')

const { data: messages, execute: refreshMessages } = await useAsyncData(() =>
  $api(`/api/conversations/${props.conversationId}/messages`),
)

watch(
  () => props.conversationId,
  async () => {
    await refreshMessages()
    scrollToBottom()
  },
  { immediate: true },
)

function scrollToBottom() {
  if (messagesContainer.value)
    messagesContainer.value.scrollTop = messagesContainer.value?.scrollHeight
}

async function addMessage(message: Message) {
  messages.value = [...(messages.value ?? []), message] as typeof messages.value
  emit('last-message-updated', message)
  await nextTick()
  scrollToBottom()
}
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
          :message="message.content"
          :is-own="message.senderId === useAuthStore().getUserId()"
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
