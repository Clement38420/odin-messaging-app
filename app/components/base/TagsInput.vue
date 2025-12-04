<script setup lang="ts">
const model = defineModel<string[]>({ default: () => [] })

const { props, errors } = defineProps<{
  errors: Record<string, string> | undefined
  props: FormFieldProps
}>()

const currentInput = ref('')

const input = useTemplateRef<HTMLElement | null>(props.name)
function focusInput() {
  input.value?.focus()
}

const addTag = () => {
  const val = currentInput.value.trim()
  if (val && !model.value.includes(val)) {
    model.value = [...model.value, val]
    currentInput.value = ''
  }
}

const removeTag = (index: number) => {
  const newTags = [...model.value]
  newTags.splice(index, 1)
  model.value = newTags
}

const removeLastTag = () => {
  if (currentInput.value === '' && model.value.length > 0) {
    removeTag(model.value.length - 1)
  }
}

const fieldError = computed(() => {
  return errors?.[props.name] || undefined
})

function tagError(tagIndex: number) {
  return errors?.[`${props.name}.${tagIndex}`] || undefined
}
</script>

<template>
  <div
    id="container"
    class="relative mb-8"
    :class="{ 'animate-shakeX-soft': fieldError }"
    @click="focusInput"
  >
    <div
      class="flex w-full cursor-text flex-wrap items-center gap-2 overflow-x-scroll rounded-md border-2 border-zinc-400 bg-transparent p-2 transition-colors"
      :class="[
        fieldError ? 'input-error' : 'focus-within:border-primary-light',
      ]"
    >
      <span
        v-for="(tag, index) in model"
        :key="tag"
        class="bg-primary-light/20 animate-in fade-in zoom-in flex items-center gap-1 rounded px-2 py-1 text-sm leading-none font-medium text-nowrap duration-200"
        :class="[tagError(index) ? '!text-error' : '!text-text-base']"
      >
        {{ tag }}
        <button
          type="button"
          class="hover:text-error text-lg leading-none focus:outline-none"
          @click.stop="removeTag(index)"
          @mousedown.prevent.stop
        >
          &times;
        </button>
      </span>

      <input
        :id="props.name"
        :ref="props.name"
        v-model="currentInput"
        type="text"
        class="peer bg-transparent text-base outline-none"
        placeholder=""
        @keydown.enter.prevent="addTag"
        @keydown.space.prevent="addTag"
        @keydown.delete="removeLastTag"
        @blur="addTag"
      />

      <label
        :for="props.name"
        class="invalid:input-error text-text-muted peer-focus:text-primary-light absolute -top-5 left-2 cursor-text text-sm not-peer-focus:peer-placeholder-shown:translate-y-7.5 not-peer-focus:peer-placeholder-shown:text-base"
        :class="{
          'input-error': fieldError,
          '!translate-y-0 !text-sm': model.length > 0,
        }"
      >
        {{ props.title }}
        <span v-if="!props.required" class="-ml-1 text-xs"> (optional)</span>
      </label>
    </div>

    <p v-show="fieldError" class="text-error mt-1 max-w-full text-sm">
      <Icon
        class="align-middle"
        name="material-symbols:error-outline-rounded"
      ></Icon>
      {{ fieldError }}
    </p>
  </div>
</template>

<style scoped>
#container:not(:focus-within) input {
  width: 0;
}
</style>
