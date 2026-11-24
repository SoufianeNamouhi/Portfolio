<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

const error = useError()
const statusCode = computed(() => (error.value as { statusCode?: number } | null)?.statusCode ?? 404)
</script>

<template>
  <div class="grid min-h-dvh place-items-center bg-background px-6">
    <div class="text-center">
      <p class="section-label">// {{ statusCode }}</p>
      <h1 class="heading-display mt-4 text-4xl md:text-5xl">Page not found</h1>
      <p class="text-body-gray mt-4">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <NuxtLink to="/" class="btn-primary mt-8">
        Return home
        <span class="btn-icon"><ArrowRight class="size-4" /></span>
      </NuxtLink>
    </div>
  </div>
</template>
