<script setup>
import NoAcess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import DetailsProject from "@/components/DetailsProject.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { permissionsToProjectEdit } from "@/commons/constant";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToProjectEdit = currentUserPermissions !== null && permissionsToProjectEdit.some(permission => currentUserPermissions.includes(permission));
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <DetailsProject v-if="hasAccessToProjectEdit" />
      <NoAcess v-if="!hasAccessToProjectEdit" label="edit the project" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
