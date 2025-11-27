<script setup>
import { ref, computed, useSlots } from 'vue'
import { mdiClose } from '@mdi/js'
import { colorsBgLight, colorsOutline } from '@/colors.js'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useDarkModeStore } from '@/stores/darkMode'

const props = defineProps({
  icon: String,
  outline: Boolean,
  color: {
    type: String,
    required: true,
  },
})

const componentClass = computed(() =>
  props.outline ? colorsOutline[props.color] : colorsBgLight[props.color],
)

const isDismissed = ref(false)

const dismiss = () => {
  isDismissed.value = true
}

const slots = useSlots()

const hasRightSlot = computed(() => slots.right)

const darkModeStore = useDarkModeStore()
</script>

<template>
  <div
    v-if="!isDismissed"
    :class="[componentClass, { 'transition-colors': !darkModeStore.isInProgress }]"
    class="mb-6 rounded-lg border px-3 py-6 last:mb-0 md:py-3"
  >
    <BaseLevel>
      <div class="flex flex-col items-center md:flex-row">
        <BaseIcon
          v-if="icon"
          :path="icon"
          w="w-10 md:w-5"
          h="h-10 md:h-5"
          size="24"
          class="md:mr-2"
        />
        <span class="text-center md:py-2 md:text-left"><slot /></span>
      </div>
      <slot v-if="hasRightSlot" name="right" />
      <BaseButton v-else :icon="mdiClose" small rounded-full color="white" @click="dismiss" />
    </BaseLevel>
  </div>
</template>
