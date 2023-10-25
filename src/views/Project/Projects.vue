<script setup>
import NoAcess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import TableProjects from "@/components/TableProjects.vue";
import { permissionsToProjectView } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToProjectView = currentUserPermissions !== null && permissionsToProjectView.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <TableProjects v-if="hasAccessToProjectView" />
      <NoAcess v-if="!hasAccessToProjectView" label="view projects" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
