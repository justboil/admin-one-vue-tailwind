<script setup>
import { ref, computed, onMounted, watch } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import PillTag from "@/components/PillTag.vue";
import TableProjects from "@/components/TableProjects.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";

const pillsSettingsModel = ref(["icon"]);
const pillsOutline = computed(
  () => pillsSettingsModel.value.indexOf("outline") > -1
);
const pillsSmall = computed(
  () => pillsSettingsModel.value.indexOf("small") > -1
);



</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Projects" main>
        <BaseButton
          href="/project/create"
          :icon="mdiPlus"
          label="Add Project"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      <CardBox>
        <BaseButtons>
          <PillTag
            color="contrast"
            label="All Projects"
            :small="pillsSmall"
            :outline="pillsOutline"
            :number="projectsCount"
          />
          <PillTag
            color="info"
            label="Open"
            :small="pillsSmall"
            :outline="pillsOutline"
            :number="projectsCount"
          />
          <PillTag
            color="success"
            label="Completed"
            :small="pillsSmall"
            :outline="pillsOutline"
            :number="projectsCount"
          />
          <PillTag
            color="warning"
            label="On Hold"
            :small="pillsSmall"
            :outline="pillsOutline"
            :number="projectsCount"
          />
          <PillTag
            color="danger"
            label="Overdue"
            :small="pillsSmall"
            :outline="pillsOutline"
            :number="projectsCount"
          />
        </BaseButtons>
      </CardBox>
    </SectionMain>

    <SectionMain>
      <TableProjects />
    </SectionMain>
  </LayoutAuthenticated>
</template>
