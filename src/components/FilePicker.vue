<template>
  <field :label="label" :wrap-body="true">
    <field class="file" :addons="true">
      <control :upload="true">
        <a class="button blue" :class="{'addon-right':file}">
          Upload
        </a>
        <input type="file" ref="input" :accept="accept" @input="upload">
      </control>
      <control v-if="file">
        <span class="inline-flex px-4 py-2 justify-center bg-gray-100 border-gray-200 border rounded-r">{{ file.name }}</span>
      </control>
    </field>
  </field>
</template>

<script>
import { ref } from 'vue'
import Field from '@/components/Field'
import Control from '@/components/Control'

export default {
  name: 'FilePicker',
  components: {
    Field,
    Control
  },
  props: {
    modelValue: [Object, File, Array],
    label: {
      type: String,
      default: 'File'
    },
    accept: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup (props) {
    const file = ref(props.modelValue)

    // const uploadPercent = ref(0)

    return {
      file
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
