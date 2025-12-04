<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  error: string | undefined
  props: FormFieldProps
}>()

const specialTypes = ['textarea']
</script>

<template>
  <div class="relative mb-8" :class="error ? 'animate-shakeX-soft' : ''">
    <input
      v-if="!specialTypes.includes(props.type ?? 'text')"
      :id="props.name"
      v-model="model"
      :type="props.type ?? 'text'"
      placeholder=""
      class="peer focus:border-primary-light invalid:input-error w-full rounded-md border-2 border-zinc-400 bg-transparent p-2 transition-colors focus:outline-none"
      :class="{ 'input-error': error }"
    />
    <textarea
      v-if="props.type === 'textarea'"
      :id="props.name"
      v-model="model"
      placeholder=""
      class="peer focus:border-primary-light invalid:input-error max-h-60 min-h-11 w-full rounded-md border-2 border-zinc-400 bg-transparent p-2 transition-colors focus:outline-none"
      :class="{ 'input-error': error }"
    ></textarea>

    <label
      :for="props.name"
      class="invalid:input-error text-text-muted peer-focus:text-primary-light absolute -top-5 left-2 cursor-text text-sm not-peer-focus:peer-placeholder-shown:translate-y-7.5 not-peer-focus:peer-placeholder-shown:text-base"
      :class="{ 'input-error': error }"
    >
      {{ props.title }}
      <span v-if="!props.required" class="-ml-1 text-xs"> (optional)</span>
    </label>
    <p v-show="error" class="text-error mt-1 max-w-full text-sm">
      <Icon
        class="align-middle"
        name="material-symbols:error-outline-rounded"
      ></Icon>
      {{ error }}
    </p>
  </div>
</template>
