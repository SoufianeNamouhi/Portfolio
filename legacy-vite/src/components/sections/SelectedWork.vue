<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { projects } from '@/content/projects'
import ProjectRow from '@/components/projects/ProjectRow.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppButton from '@/components/ui/AppButton.vue'
import Reveal from '@/components/motion/Reveal.vue'

const { t } = useI18n()
const featured = projects.slice(0, 4)
</script>

<template>
  <section id="work" class="wrap py-24 md:py-36" aria-labelledby="work-title">
    <Reveal>
      <SectionHeading index="01" :eyebrow="t('home.selectedWork.eyebrow')">
        <span id="work-title">{{ t('home.selectedWork.title') }}</span>
      </SectionHeading>
      <p class="-mt-4 mb-12 max-w-2xl text-sm text-muted md:-mt-8 md:mb-16 md:text-base">
        {{ t('home.selectedWork.subtitle') }}
      </p>
    </Reveal>

    <div class="grid">
      <ProjectRow v-for="project in featured" :key="project.slug" :project="project" />
    </div>

    <Reveal class="mt-12 flex justify-center md:mt-16">
      <AppButton to="/projects" variant="outline" size="lg" magnetic>
        {{ t('common.viewAllProjects') }}
      </AppButton>
    </Reveal>
  </section>
</template>
