<script setup lang="ts">
defineProps<{
  conversation: ConversationSnippet
}>()
</script>

<template>
  <NuxtLink :to="`/conversations/${conversation.id}`" class="rounded-2xl">
    <BaseCard
      class="hover-effect relative w-full cursor-pointer items-start gap-1 pr-10 !shadow-md"
      :class="
        useConversationsStore().getCurrentConversationId() === conversation.id
          ? 'bg-bg-light scale-105 shadow-xl'
          : ''
      "
    >
      <h2 class="w-full truncate text-left text-lg">
        {{ conversation.name ?? 'Not named' }}
      </h2>
      <p class="text-text-muted ml-1 w-full truncate text-left">
        {{ conversation.lastMessage?.content || '\u00A0' }}
      </p>
      <div
        v-show="!useConversationsStore().isRead(conversation)"
        class="bg-secondary absolute top-[50%] right-5 h-2 w-2 -translate-y-[50%] rounded-full"
      ></div>
    </BaseCard>
  </NuxtLink>
</template>

<style scoped></style>
