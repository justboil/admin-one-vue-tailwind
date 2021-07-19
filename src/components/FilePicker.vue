<template>
  <div class="flex items-stretch justify-start relative">
    <label class="inline-flex">
      <jb-button
        as="a"
        label="Upload"
        :icon="mdiUpload"
        color="info"
        :class="{ 'rounded-r-none': file }"
      />
      <input
        type="file"
        ref="input"
        class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"
        :accept="accept"
        @input="upload">
    </label>
    <div v-if="file">
      <span class="inline-flex px-4 py-2 justify-center bg-gray-100 border-gray-200 border rounded-r">{{ file.name }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mdiUpload } from '@mdi/js'
import JbButton from '@/components/JbButton'

export default {
  name: 'FilePicker',
  components: {
    JbButton
  },
  props: {
    modelValue: [Object, File, Array],
    label: String,
    icon: String,
    accept: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup (props) {
    const file = ref(props.modelValue)

    return {
      file,
      mdiUpload
    }
  },
  methods: {
    upload (event) {
      const value = event.target.files || event.dataTransfer.files

      this.file = value[0]
      this.$emit('update:modelValue', this.file)

      // Use this as an example for handling file uploads
      // let formData = new FormData()
      // formData.append('file', this.file)

      // axios
      //   .post(window.routeMediaStore, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     },
      //     onUploadProgress: this.progressEvent
      //   })
      //   .then(r => {
      //
      //   })
      //   .catch(err => {
      //
      //   })
    }//,
    // progressEvent (progressEvent) {
    //   this.uploadPercent = Math.round(
    //     (progressEvent.loaded * 100) / progressEvent.total
    //   )
    // }
  },
  watch: {
    modelValue (value) {
      this.file = value

      if (!value) {
        this.$refs.input.value = null
      }
    }
  }
}
</script>
