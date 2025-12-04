<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const formOptions = {
  beforeSubmit: (fields) => {
    const username = useAuthStore().getUserUsername() as string

    if (!fields.participantUsernames.value.includes(username)) {
      ;(fields.participantUsernames!.value as streing[]).push(
        useAuthStore().getUserUsername(),
      )
    }
  },
  onSuccess: async (conversation: Conversation) => {
    useConversationsStore().fetchConversations()
    await navigateTo(`/conversations/${conversation.id}`)
  },
  onError: async (error) => {
    if (error instanceof FetchError) {
      if (error.data.data.code === 'UNIQUE_VIOLATION') {
        await navigateTo(
          `/conversations/${error.data.data.meta.existingConversationId}`,
        )
      }
    }
  },
}
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <BaseCard class="w-100 px-16 py-10">
      <h2 class="mx-auto mb-5 max-w-fit text-2xl">New conversation</h2>
      <FormsVForm
        :schema="conversationCreateSchema"
        api-endpoint="/api/conversations/"
        :options="formOptions"
      />
    </BaseCard>
  </div>
</template>

<style scoped></style>
