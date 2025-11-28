<script setup lang="ts">
const { $api, runWithContext } = useNuxtApp()

async function logout() {
  await $api('/api/logout')
  useAuthStore().clearUser()
  await runWithContext(() => navigateTo('/login'))
}
</script>

<template>
  <div class="relative grid h-dvh grid-cols-1 grid-rows-[4rem_1fr_3rem]">
    <header
      class="bg-bg-base flex items-center justify-between p-4 text-center shadow-md"
    >
      <NuxtLink to="/">
        <img
          src="~~/assets/images/logo.svg"
          alt="Dash logo"
          class="max-h-full"
        />
      </NuxtLink>
      <div class="flex h-[90%] gap-2">
        <NuxtLink
          to="/profile"
          class="hover-vibration-off hover:text-text-base text-text-muted flex items-center rounded-full transition-transform hover:-translate-y-0.5"
        >
          <Icon
            class="aspect-square h-full w-auto drop-shadow-sm transition hover:drop-shadow-lg"
            name="material-symbols:account-circle-outline"
            mode="svg"
          ></Icon>
        </NuxtLink>
        <button
          class="hover-vibration-off hover:text-text-base text-text-muted flex cursor-pointer items-center rounded-full transition-transform hover:-translate-y-0.5"
          @click="logout"
        >
          <Icon
            class="aspect-square h-full w-auto drop-shadow-sm transition hover:drop-shadow-lg"
            name="material-symbols:logout-rounded"
            mode="svg"
          ></Icon>
        </button>
      </div>
    </header>
    <div class="relative flex h-full flex-col justify-center">
      <slot></slot>
    </div>
    <footer class="text-center">Footer</footer>
  </div>
</template>

<style scoped></style>
