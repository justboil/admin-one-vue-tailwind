<script setup>
import NoAccess from "@/components/NoAcess.vue";
import SectionMain from "@/components/SectionMain.vue";
import CreateUser from "@/components/CreateUser.vue";
import { permissionsToUserAdd } from "@/commons/constant";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";

const currentUserPermissions = JSON.parse(localStorage.getItem('permissions'));
const hasAccessToUserCreate = currentUserPermissions !== null && permissionsToUserAdd.some(permission => currentUserPermissions.includes(permission));

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CreateUser v-if="hasAccessToUserCreate" />
      <NoAccess v-if="!hasAccessToUserCreate" label="add a new user" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
