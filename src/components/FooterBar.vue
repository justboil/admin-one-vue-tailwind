<script setup>
import { containerMaxW } from "/src/config.js";
import BaseLevel from "/src/components/BaseLevel.vue";
import JustboilLogo from "/src/components/JustboilLogo.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy;{{ year }},
          <a href="https://github.com/ku-graduate-project" target="_blank">졸프 6팀</a>.</b
        >
        <slot />
      </div>
      <div class="md:py-2">
        <a href="https://github.com/ku-graduate-project">
          <JustboilLogo class="w-auto h-8 md:h-6" />
        </a>
      </div>
    </BaseLevel>
  </footer>
</template>
