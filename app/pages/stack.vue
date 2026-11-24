<script setup lang="ts">
useSeoMeta({
  title: 'Stack',
  description:
    'The technologies Soufiane Namouhi uses in production: Vue.js, TypeScript, Java, Spring Boot, PostgreSQL, Flutter and the tooling around them.',
})
</script>

<template>
  <div class="pt-14 md:pt-20">
    <HomeTechnologyKeyboard />
    <div class="container-page mt-16 border-t border-border pt-10">
      <p class="text-body-gray max-w-2xl text-sm">
        Durations are shown only where verified. Everything else is listed without numbers — a
        technology on this board is something I use in real projects, not a claim of mastery.
      </p>
    </div>
  </div>
</template>
