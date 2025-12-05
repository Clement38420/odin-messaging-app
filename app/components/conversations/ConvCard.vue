<script setup lang="ts">
defineProps<{
  conversation: ConversationSnippet
}>()
</script>

<template>
  <div class="group relative z-0 rounded-2xl">
    <BaseCard
      class="hover-effect relative w-full cursor-pointer items-start gap-1 pr-10 !shadow-md"
      :class="
        useConversationsStore().getCurrentConversationId() === conversation.id
          ? 'bg-bg-light scale-105 shadow-xl'
          : ''
      "
    >
      <NuxtLink
        :to="`/conversations/${conversation.id}`"
        class="absolute inset-0 z-10"
        @click="useConversationsStore().updateLastSeenAt(conversation.id)"
      ></NuxtLink>
      <h2 class="w-full truncate text-left text-lg">
        {{ conversation.name ?? 'Not named' }}
      </h2>
      <p class="text-text-muted ml-1 w-full truncate text-left">
        {{ conversation.lastMessage?.content || '\u00A0' }}
      </p>
      <div
        class="absolute top-[50%] right-5 z-20 flex -translate-y-[50%] items-center gap-2"
      >
        <div
          v-show="!useConversationsStore().isRead(conversation)"
          class="bg-secondary h-2 w-2 rounded-full"
        ></div>
        <NuxtLink
          :to="`/conversations/${conversation.id}/info`"
          class="hover:text-primary-light text-text-muted"
        >
          <Icon
            id="info-icon"
            name="material-symbols:info-outline-rounded"
            class="animate__animated animate__fadeIn animate__faster hidden h-5 w-5 group-focus-within:block group-hover:block"
          ></Icon>
        </NuxtLink>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
#info-icon {
  --animate-duration: 0.5s;
}
</style>
