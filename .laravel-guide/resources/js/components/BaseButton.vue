<script setup>
import { getButtonColor } from '@/colors.js';
import BaseIcon from '@/components/BaseIcon.vue';
import { useDarkModeStore } from '@/stores/darkMode';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: [String, Number],
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  iconSize: {
    type: [String, Number],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  target: {
    type: String,
    default: null,
  },
  route: {
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'white',
  },
  as: {
    type: String,
    default: null,
  },
  small: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean,
  roundedFull: Boolean,
});

const is = computed(() => {
  if (props.as) {
    return props.as;
  }

  if (props.route) {
    return Link;
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
});

const computedType = computed(() => {
  if (is.value === 'button') {
    return props.type ?? 'button';
  }

  return null;
});

const labelClass = computed(() => (props.small && props.icon ? 'px-1' : 'px-2'));

const componentClass = computed(() => {
  const base = [
    'inline-flex',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'focus:outline-hidden',
    useDarkModeStore().isInProgress ? '' : 'transition-colors',
    'focus:ring-3',
    'border',
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    props.roundedFull ? 'rounded-full' : 'rounded-sm',
    getButtonColor(props.color, props.outline, !props.disabled, props.active),
  ];

  if (!props.label && props.icon) {
    base.push('p-1');
  } else if (props.small) {
    base.push('text-sm', props.roundedFull ? 'px-3 py-1' : 'p-1');
  } else {
    base.push('py-2', props.roundedFull ? 'px-6' : 'px-3');
  }

  if (props.disabled) {
    base.push(props.outline ? 'opacity-50' : 'opacity-70');
  }

  return base;
});
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :href="route ?? href ?? null"
    :type="computedType"
    :target="target"
    :disabled="disabled"
  >
    <BaseIcon v-if="icon" :path="icon" :size="iconSize" />
    <span v-if="label" :class="labelClass">{{ label }}</span>
  </component>
</template>
