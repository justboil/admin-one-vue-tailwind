<script setup>
import { FormKit } from '@formkit/vue';
import { ref, watch } from 'vue';


const props = defineProps({
    analitic: {
        type: Object,
        required: true,        
    },
  
});

const emit = defineEmits(['update'])





const localAnalitic = ref({ ...props.analitic });

watch(() => props.analitic, (newVal) => {
  localAnalitic.value = {...newVal}
}, { immediate: true })

watch(localAnalitic, (newVal) => {
  emit('update', newVal)
}, { deep: true })
// watch(() => localAnalitic, (newVal) => {
//         // <div v-if="localAnalitic.value.type === 29">
// });

</script>


<template>
               
               <div v-if="localAnalitic.type">
            <div v-if="localAnalitic.type === 29">
              <h2 class="font-bold text-xl mb-3 mt-3 text-gray-600 flex justify-center">
                Caracteristicas Organolépticas
              </h2>
              <div class="border border-gray-300 p-4 rounded-md mb-6 flex flex-col items-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormKit
                    v-model="localAnalitic.olor"
                    type="checkbox"
                    label="Olor"
                    help="Marca si el agua tiene mal olor"
                    name="olor"
                    validation-visibility="dirty"
                  />
                  <FormKit
                    v-model="localAnalitic.color"
                    type="checkbox"
                    label="Color"
                    help="Marca si el agua tiene mal color"
                    name="color"
                    validation-visibility="dirty"
                  />
                  <FormKit
                    v-model="localAnalitic.sabor"
                    type="checkbox"
                    label="Sabor"
                    help="Marca si el agua tiene mal sabor"
                    name="sabor"
                    validation-visibility="dirty"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <FormKit
                v-model.number="localAnalitic.cloro"
                type="number"
                placeholder="Cloro Residual"
                label="Cloro Residual"
                help="mg/l"
                validation="number|min:0|max:99"
              ></FormKit>
              <FormKit
                v-model="localAnalitic.ph"
                type="number"
                placeholder="pH"
                label="pH"
                help="ud"
                validation="number|min:0|max:14"
              />
              <FormKit
                v-model.number="localAnalitic.turbidez"
                type="number"
                placeholder="Turbidez"
                label="Turbidez"
                help="UNF"
                validation="number|min:0|max:999"
              />
            </div>
            <div>
              <FormKit
                v-model="localAnalitic.observaciones"
                type="textarea"
                placeholder="Introduce cualquier tipo de incidencia"
                inner-class="w-full"
                wrapper-class="w-full"
              />
            </div>
          </div>

    
</template>


