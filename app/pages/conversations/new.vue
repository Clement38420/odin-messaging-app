<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { fields, generalError, isSubmitPending, submit } = useForm(
  conversationCreateSchema,
  '/api/conversations/',
  {
    beforeSubmit: () => {
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
        if (error.statusMessage === 'Conversation already exists') {
          await navigateTo(
            `/conversations/${error.data.data.existingConversationId}`,
          )
        }
      }
    },
  },
)
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center">
    <BaseCard class="w-100 px-16 py-10">
      <form class="relative flex flex-col" @submit.prevent="submit">
        <h2 class="mb-8 self-center text-xl font-bold">New conversation</h2>

        <BaseTextInput v-model="fields.name!.value" :field="fields.name!" />

        <BaseTagsInput
          v-model="fields.participantUsernames!.value"
          :field="fields.participantUsernames!"
        ></BaseTagsInput>

        <p v-show="generalError" class="text-error -mt-2 mb-2 text-sm">
          <Icon
            class="align-middle"
            name="material-symbols:error-outline-rounded"
          ></Icon>
          {{ generalError }}
        </p>
        <BaseButton color="primary">
          <Icon
            v-show="isSubmitPending"
            class="align-middle"
            name="line-md:loading-loop"
          ></Icon>
          Create
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped></style>
