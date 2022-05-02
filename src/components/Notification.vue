<script setup>
import { ref, computed, useSlots } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiClose } from '@mdi/js'
import { colorsBg, colorsBorders, colorsOutline } from '@/colors.js'
import Level from '@/components/Level.vue'
import Icon from '@/components/Icon.vue'
import JbButton from '@/components/JbButton.vue'

const props = defineProps({
  icon: {
    type: String,
    default: null
  },
  outline: Boolean,
  color: {
    type: String,
    required: true
  }
})

const componentClass = computed(() => props.outline
  ? colorsOutline[props.color]
  : [colorsBg[props.color], colorsBorders[props.color]])

const isDismissed = ref(false)

const dismiss = () => {
  isDismissed.value = true
}

const slots = useSlots()

const hasRightSlot = computed(() => slots.right)

const mainStore = useMainStore()

const darkMode = computed(() => mainStore.darkMode)
</script>

<template>
  <div
    v-if="!isDismissed"
    :class="componentClass"
    class="px-3 py-6 md:py-3 mx-6 md:mx-0 mb-6 last:mb-0 border rounded transition-colors duration-150"
  >
    <level>
      <div class="flex flex-col md:flex-row items-center">
        <icon
          v-if="icon"
          :path="icon"
          w="w-10 md:w-5"
          h="h-10 md:h-5"
          size="24"
          class="md:mr-2"
        />
        <span class="text-center md:text-left"><slot /></span>
      </div>
      <slot
        v-if="hasRightSlot"
        name="right"
      />
      <jb-button
        v-else
        :icon="mdiClose"
        :outline="outline || (darkMode && ['white', 'light'].indexOf(color) < 0)"
        small
        @click="dismiss"
      />
    </level>
  </div>
</template>
