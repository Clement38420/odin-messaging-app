<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const field = computed(() => {
  const fields = inject<Record<string, FormField>>('fields')!
  return fields[props.name] as FormField
})

const errors = inject<Record<string, string>>('errors')!
</script>

<template>
  <div>
    <BaseTagsInput
      v-if="field.props.type === 'tags'"
      v-model="field.value as string[]"
      :props="field.props"
      :errors="
        Object.fromEntries(
          Object.entries(errors).filter(
            ([key, _value]) =>
              key === field.props.name ||
              key.startsWith(field.props.name + '.'),
          ),
        )
      "
    />
    <BaseTextInput
      v-else
      v-model="field.value as string"
      :props="field.props"
      :error="errors[field.props.name]"
    />
  </div>
</template>

<style scoped></style>
