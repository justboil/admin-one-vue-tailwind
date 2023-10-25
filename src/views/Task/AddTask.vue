<script setup>
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CreateTask from "@/components/CreateTask.vue";


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CreateTask />
    </SectionMain>
  </LayoutAuthenticated>
</template>
