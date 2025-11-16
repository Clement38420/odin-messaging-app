<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  name: string
  title: string
  placeholder?: string
  password?: boolean
  error?: string
}>()
</script>

<template>
  <div class="relative mb-6">
    <input
      :id="name"
      v-model="model"
      :type="password ? 'password' : 'text'"
      placeholder=""
      class="peer focus:border-primary-light invalid:input-error w-full rounded-md border-2 border-zinc-400 bg-transparent p-2 transition-colors focus:outline-none"
      :class="{ 'input-error': error }"
    />
    <label
      :for="name"
      class="invalid:input-error text-text-muted peer-focus:text-primary-light absolute -top-5 left-2 text-sm not-peer-focus:peer-placeholder-shown:translate-y-7.5 not-peer-focus:peer-placeholder-shown:text-base"
      :class="{ 'input-error': error }"
    >
      {{ title }}
    </label>
    <p v-show="error" class="text-error absolute mt-1 text-sm">
      <Icon
        class="align-middle"
        name="material-symbols:error-outline-rounded"
      ></Icon>
      {{ error }}
    </p>
  </div>
</template>
