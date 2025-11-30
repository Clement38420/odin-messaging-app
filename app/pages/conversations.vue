<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const conversationsStore = useConversationsStore()

await conversationsStore.fetchConversations()
</script>

<template>
  <div class="absolute inset-0 grid grid-cols-8">
    <aside
      class="col-span-2 flex flex-col gap-4 overflow-y-auto border-r border-gray-200 p-8"
    >
      <ConversationsConvCard
        v-for="conversation in conversationsStore.conversations"
        :key="conversation.id"
        :conversation="conversation"
      />
    </aside>

    <NuxtPage
      class="col-span-6"
      :page-key="(route) => route.fullPath"
      @last-message-updated="
        conversationsStore.updateLastMessage(
          conversationsStore.getCurrentConversationId()!,
          $event,
        )
      "
    ></NuxtPage>
  </div>
</template>

<style scoped></style>
