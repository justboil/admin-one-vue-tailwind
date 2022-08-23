<script setup>
import { computed } from "vue";
import { colorsBgLight, colorsOutline } from "@/colors.js";
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  small: Boolean,
  outline: Boolean,
});

const componentClass = computed(() => {
  const baseColor = props.outline
    ? colorsOutline[props.color]
    : colorsBgLight[props.color];

  const base = [
    "border",
    props.small ? "py-1 px-4 text-xs rounded-full" : "py-2 px-6 rounded-full",
    baseColor,
  ];

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
    <span>{{ label }}</span>
  </div>
</template>
