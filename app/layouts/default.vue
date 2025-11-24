<script setup lang="ts"></script>

<template>
  <div class="grid h-dvh grid-cols-1 grid-rows-[4rem_1fr_3rem]">
    <header
      class="bg-bg-base flex items-center justify-between p-4 text-center shadow-md"
    >
      <img src="~~/assets/images/logo.svg" alt="Dash logo" class="max-h-full" />
      <NuxtLink
        to="/profile"
        class="hover-vibration-off hover:text-text-base text-text-muted flex h-[90%] items-center rounded-full transition-transform hover:-translate-y-0.5"
      >
        <Icon
          class="aspect-square h-full w-auto drop-shadow-sm transition hover:drop-shadow-lg"
          name="material-symbols:account-circle-outline"
          mode="svg"
        ></Icon>
      </NuxtLink>
    </header>
    <slot></slot>
    <footer class="text-center">Footer</footer>
  </div>
</template>

<style scoped></style>
