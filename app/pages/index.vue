<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()

const { data: conversations } = await useAsyncData(() =>
  $api('/api/conversations'),
)
const selectedConversationId = ref<number | null>(null)

const { data: messages, execute: refreshMessages } = await useAsyncData(
  () => $api(`/api/conversations/${selectedConversationId.value}/messages`),
  {
    immediate: false,
  },
)

function updateSelectedConversation(id: number) {
  selectedConversationId.value = id
  if (selectedConversationId.value) refreshMessages()
}
</script>

<template>
  <div class="grid grid-cols-8">
    <aside class="col-span-2 flex flex-col gap-4 p-8 text-center">
      <IndexConvCard
        v-for="conversation in conversations"
        :key="conversation.id"
        :title="conversation.name"
        last-message="T où ?"
        @click="updateSelectedConversation(conversation.id)"
      />
    </aside>
    <main class="col-span-6 flex flex-col justify-end p-8 text-center">
      <IndexMessage
        v-for="message in messages"
        :key="message.id"
        :message="message.content"
      />
    </main>
  </div>
</template>

<style scoped></style>
