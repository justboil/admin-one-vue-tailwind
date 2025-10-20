<script setup>
import { mdiGithub } from '@mdi/js'
import BaseButton from '@/components/BaseButton.vue'
import SectionBanner from '@/components/SectionBanner.vue'
import { gradientBgPinkRed } from '@/colors'
</script>

<template>
  <SectionBanner :class="gradientBgPinkRed">
    <h1 class="mb-6 text-3xl text-white">Like the project? Please star on <b>GitHub</b> ;-)</h1>
    <div>
      <BaseButton
        href="https://github.com/justboil/admin-one-vue-tailwind"
        :icon="mdiGithub"
        label="GitHub"
        target="_blank"
        rounded-full
      />
    </div>
  </SectionBanner>
</template>
