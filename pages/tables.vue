<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
} from "@mdi/js";
</script>

<template>
  <div>
    <NuxtLayout name="authenticated">
      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main>
          <BaseButton
            href="https://github.com/justboil/admin-one-vue-tailwind"
            target="_blank"
            :icon="mdiGithub"
            label="Star on GitHub"
            color="contrast"
            rounded-full
            small
          />
        </SectionTitleLineWithButton>
        <NotificationBar color="info" :icon="mdiMonitorCellphone">
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

        <CardBox class="mb-6" has-table>
          <TableSampleClients checkable />
        </CardBox>

        <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

        <NotificationBar color="danger" :icon="mdiTableOff">
          <b>Empty table.</b> When there's nothing to show
        </NotificationBar>

        <CardBox>
          <CardBoxComponentEmpty />
        </CardBox>
      </SectionMain>
    </NuxtLayout>
  </div>
</template>
