<script setup lang="ts">
useSeoMeta({
  title: 'Software Developer — Enterprise Web Applications',
  description:
    'Soufiane Namouhi is a software developer based in Morocco, building enterprise web applications, logistics systems and modern frontend experiences with Vue.js, Java, Spring Boot and PostgreSQL.',
})

definePerson({
  name: 'Soufiane Namouhi',
  jobTitle: 'Software Developer',
  address: { addressLocality: 'Casablanca', addressCountry: 'MA' },
})
</script>

<template>
  <div>
    <HomeHeroSection />
    <div class="mt-4">
      <HomeProjectMarquee />
    </div>
    <HomeSelectedWork />
    <HomeEngineeringProcess />
    <HomeTechnologyKeyboard />
    <HomeCareerTimeline />
    <HomeAboutSection />
    <HomeContactSection />
  </div>
</template>
