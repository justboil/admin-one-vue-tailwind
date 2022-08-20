<script setup>
import { computed } from "vue";
import { colorsBgLight, colorsOutline } from "@/colors.js";
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  small: Boolean,
  outline: Boolean,
  wrapped: Boolean,
});

const componentClass = computed(() => {
  const baseColor = props.outline
    ? colorsOutline[props.type]
    : colorsBgLight[props.type];

  const base = [
    "border",
    props.small ? "py-1 px-4 text-xs rounded-full" : "py-2 px-6 rounded-full",
    baseColor,
  ];

  if (!props.wrapped) {
    base.push(props.small ? "mr-1.5" : "mr-3", "last:mr-0");
  }

  return base;
});
</script>

<template>
  <div class="inline-flex items-center capitalize" :class="componentClass">
    <BaseIcon
      v-if="icon"
      :path="icon"
      h="h-4"
      w="w-4"
      :class="small ? 'mr-1' : 'mr-2'"
      :size="small ? 14 : 16"
    />
    <span>{{ text }}</span>
  </div>
</template>
