<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { $api } = useNuxtApp()
const conversationsStore = useConversationsStore()
const authStore = useAuthStore()
const conversationId = conversationsStore.getCurrentConversationId()

const { data: conversation } = await useAsyncData(
  `conversation-${conversationId}`,
  () =>
    $api(`/api/conversations/${conversationId}`, {
      method: 'GET',
    }),
)

if (!conversation.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Conversation not found',
  })
}

async function leaveConversation() {
  await $api(`/api/conversations/${conversationId}/members/me`, {
    method: 'DELETE',
  })

  conversationsStore.deleteConversation(conversationId!)
  navigateTo('/conversations')
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <BaseCard class="flex min-w-100 flex-col px-16 py-10">
      <h2 v-if="!conversation?.isGroup" class="mx-auto max-w-fit text-2xl">
        <span class="text-text-muted">Conversation with </span>

        <NuxtLink
          :to="`/users/${conversation?.users.find((u) => u.id !== authStore.getUserId())?.id}`"
        >
          <div class="inline-flex items-center gap-1">
            <span>{{ conversation?.name }}</span>

            <Icon
              class="text-primary-light h-4 w-4"
              name="material-symbols:open-in-new-rounded"
            ></Icon>
          </div>
        </NuxtLink>
      </h2>
      <h2 v-else class="mx-auto mb-10 max-w-fit text-2xl">
        {{ conversation?.name || 'Not named' }}
      </h2>
      <div v-if="conversation?.isGroup" class="mb-5 flex flex-col">
        <div class="mb-4 flex items-center justify-between">
          <span class="mb-2">Members</span>
        </div>

        <ul class="text-text-muted flex flex-col gap-2">
          <li v-for="user in conversation?.users" :key="user.id">
            <NuxtLink :to="`/users/${user.id}`">
              <BaseCard
                class="bg-bg-light flex flex-row items-center justify-between"
              >
                <span>{{ user.username }}</span>
                <Icon name="material-symbols:open-in-new-rounded"></Icon>
              </BaseCard>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <BaseButton
        v-if="conversation?.isGroup"
        color="danger"
        class="mt-10 self-end px-6"
        @click="leaveConversation"
        >Leave</BaseButton
      >
    </BaseCard>
  </div>
</template>
