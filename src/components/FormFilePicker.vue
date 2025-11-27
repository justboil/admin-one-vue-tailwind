<script setup>
import { mdiUpload } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  modelValue: [Object, File, Array],
  label: String,
  icon: {
    type: String,
    default: mdiUpload,
  },
  accept: String,
  color: {
    type: String,
    default: 'info',
  },
  isRoundIcon: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const root = ref(null)

const file = ref(props.modelValue)

const showFilename = computed(() => !props.isRoundIcon && file.value)

const modelValueProp = computed(() => props.modelValue)

watch(modelValueProp, (value) => {
  file.value = value

  if (!value) {
    root.value.input.value = null
  }
})

const upload = (event) => {
  const value = event.target.files || event.dataTransfer.files

  file.value = value[0]

  emit('update:modelValue', file.value)

  // Use this as an example for handling file uploads
  // let formData = new FormData()
  // formData.append('file', file.value)

  // const mediaStoreRoute = `/your-route/`

  // axios
  //   .post(mediaStoreRoute, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     onUploadProgress: progressEvent
  //   })
  //   .then(r => {
  //
  //   })
  //   .catch(err => {
  //
  //   })
}

// const uploadPercent = ref(0)
//
// const progressEvent = progressEvent => {
//   uploadPercent.value = Math.round(
//     (progressEvent.loaded * 100) / progressEvent.total
//   )
// }
</script>

<template>
  <div class="relative flex items-stretch justify-start">
    <label class="inline-flex">
      <BaseButton
        as="a"
        :class="{ 'h-12 w-12': isRoundIcon, 'rounded-r-none': showFilename }"
        :icon-size="isRoundIcon ? 24 : undefined"
        :label="isRoundIcon ? null : label"
        :icon="icon"
        :color="color"
        :rounded-full="isRoundIcon"
      />
      <input
        ref="root"
        type="file"
        class="absolute top-0 left-0 -z-1 h-full w-full cursor-pointer opacity-0 outline-hidden"
        :accept="accept"
        @input="upload"
      />
    </label>
    <div
      v-if="showFilename"
      class="rounded-r border border-gray-200 bg-gray-100 px-4 py-2 dark:border-slate-700 dark:bg-slate-800"
    >
      <span class="line-clamp-1 text-ellipsis">
        {{ file.name }}
      </span>
    </div>
  </div>
</template>
