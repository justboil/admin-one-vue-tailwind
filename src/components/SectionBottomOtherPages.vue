<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { mdiGithub } from '@mdi/js'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseIcon from '@/components/BaseIcon.vue'

const routes = useRouter().getRoutes()

const screens = []

for (const routeIndex in routes) {
  const path = routes[routeIndex].path
  const title = routes[routeIndex].meta && routes[routeIndex].meta.title ? routes[routeIndex].meta.title : null

  if (title) {
    screens.push({
      path,
      title
    })
  }
}
</script>

<template>
  <SectionTitle last>
    <h1 class="flex items-center justify-center flex-col md:flex-row text-2xl text-gray-500 dark:text-gray-400 mb-12">
      <span class="md:mr-3">Please star this project on</span>
      <a
        href="https://github.com/justboil/admin-one-vue-tailwind"
        class="inline-flex items-center justify-center text-blue-600"
        target="_blank"
      >
        <BaseIcon
          :path="mdiGithub"
          size="36"
          class="mr-1"
        />
        <span>GitHub</span>
      </a>
    </h1>
    <h1 class="text-2xl text-gray-500 dark:text-gray-400 mb-12">
      Check out other components and layouts at<br>
      <template
        v-for="(screen, index) in screens"
        :key="screen.path"
      >
        <RouterLink
          :to="screen.path"
          class="text-blue-600"
        >
          {{ screen.title }}
        </RouterLink>
        <template v-if="index + 1 < screens.length">
          ,
        </template>
      </template>
      <br>
      screen samples
    </h1>
    <h1 class="text-2xl text-gray-500 dark:text-gray-400">
      Get more with <a
        href="https://tailwind-vue.justboil.me/"
        target="_blank"
        class="text-blue-600"
      >Premium version</a>
    </h1>
  </SectionTitle>
</template>
