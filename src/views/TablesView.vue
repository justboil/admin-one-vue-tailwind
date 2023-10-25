<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
  mdiPlus,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableProjects from "@/components/TableProjects.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
        <BaseButton
          href="/project/create"
          target="_blank"
          :icon="mdiPlus"
          label="Add Project"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <TableProjects />
    </SectionMain>
  </LayoutAuthenticated>
</template>
