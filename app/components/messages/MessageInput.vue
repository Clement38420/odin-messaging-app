<script setup lang="ts">
import { z } from 'zod'

const emit = defineEmits<{
  (e: 'message-sent', message: z.infer<typeof messageBaseSchema>): void
}>()

const props = defineProps<{
  conversationId: number | null
}>()

const { $api } = useNuxtApp()

const message = ref('')

async function submit() {
  try {
    z.parse(messageCreateSchema, { content: message.value })

    const insertedMessage = await $api(
      `/api/conversations/${props.conversationId}/messages`,
      {
        method: 'POST',
        body: { content: message.value },
      },
    )

    emit('message-sent', insertedMessage!)
    message.value = ''
  } catch {}
}

function getMessageMaxLength() {
  return messageCreateSchema.shape['content'].maxLength
}

const isMessageOverLimit = computed(
  () => message.value.length > getMessageMaxLength()!,
)
</script>

<template>
  <form class="relative m-8" @submit.prevent="submit">
    <input
      v-model="message"
      type="text"
      placeholder="Enter your message ..."
      class="bg-bg-base w-full rounded-full p-4 pr-22 pl-5 shadow-md"
    />
    <div
      class="absolute top-[60%] right-5 flex -translate-y-[50%] flex-col items-center"
      :class="isMessageOverLimit ? '!text-error' : ''"
    >
      <button
        class="not-disabled:hover:text-primary-light right-5 w-min origin-center -translate-y-2 transition not-disabled:hover:scale-120 not-disabled:hover:-rotate-30"
        :disabled="isMessageOverLimit || message.length === 0"
        :class="!isMessageOverLimit ? 'disabled:text-text-muted' : ''"
      >
        <Icon
          name="material-symbols:send-rounded"
          class="block scale-150"
        ></Icon>
      </button>
      <div class="text-xs" :class="isMessageOverLimit ? '' : 'text-text-muted'">
        {{ message.length + '/' + getMessageMaxLength() }}
      </div>
    </div>
  </form>
</template>

<style scoped></style>
