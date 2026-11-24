<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatusStrip from '@/components/sections/StatusStrip.vue'
import SelectedWork from '@/components/sections/SelectedWork.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExpertiseSection from '@/components/sections/ExpertiseSection.vue'
import JourneySection from '@/components/sections/JourneySection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const { t } = useI18n()

useSeo(
  computed(() => ({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    path: '/',
  })),
)
</script>

<template>
  <HeroSection />
  <StatusStrip />
  <SelectedWork />
  <AboutSection />
  <ExpertiseSection />
  <JourneySection />
  <ProcessSection />
  <StackSection />
  <ContactSection />
</template>
