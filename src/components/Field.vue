<template>
  <div class="field" :class="{'addons':addons, 'grouped':grouped, 'multiline':multiline, 'spaced':spaced}">
    <label v-if="label" class="label">{{ label }}</label>
    <div v-if="wrapBody" class="field-body">
      <slot/>
    </div>
    <slot v-else/>
    <p v-if="help" class="help">{{ help }}</p>
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: {
    addons: {
      type: Boolean,
      default: false
    },
    grouped: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    },
    spaced: {
      type: Boolean,
      default: false
    },
    wrapBody: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    help: {
      type: String
    }
  }
}
</script>
