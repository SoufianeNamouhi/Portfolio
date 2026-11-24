<script setup lang="ts">
const { showIntro, finishIntro } = useSessionIntro()
</script>

<template>
  <div>
    <LayoutIntroLoader v-if="showIntro" @done="finishIntro" />
    <LayoutAppHeader />
    <main id="main-content">
      <slot />
    </main>
    <LayoutAppFooter />
    <LayoutThemeToggle />
  </div>
</template>
