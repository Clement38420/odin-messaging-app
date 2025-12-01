<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  field: FormField
}>()

const specialTypes = ['textarea']
</script>

<template>
  <div class="relative mb-8">
    <input
      v-if="!specialTypes.includes(field.type ?? 'text')"
      :id="field.name"
      v-model="model"
      :type="field.type ?? 'text'"
      placeholder=""
      class="peer focus:border-primary-light invalid:input-error w-full rounded-md border-2 border-zinc-400 bg-transparent p-2 transition-colors focus:outline-none"
      :class="{ 'input-error': field.error }"
    />
    <textarea
      v-if="field.type === 'textarea'"
      :id="field.name"
      v-model="model"
      placeholder=""
      class="peer focus:border-primary-light invalid:input-error max-h-60 min-h-11 w-full rounded-md border-2 border-zinc-400 bg-transparent p-2 transition-colors focus:outline-none"
      :class="{ 'input-error': field.error }"
    ></textarea>

    <label
      :for="field.name"
      class="invalid:input-error text-text-muted peer-focus:text-primary-light absolute -top-5 left-2 cursor-text text-sm not-peer-focus:peer-placeholder-shown:translate-y-7.5 not-peer-focus:peer-placeholder-shown:text-base"
      :class="{ 'input-error': field.error }"
    >
      {{ field.title }}
    </label>
    <p v-show="field.error" class="text-error mt-1 max-w-full text-sm">
      <Icon
        class="align-middle"
        name="material-symbols:error-outline-rounded"
      ></Icon>
      {{ field.error }}
    </p>
  </div>
</template>
