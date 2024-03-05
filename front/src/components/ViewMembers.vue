<script setup>
import CardBox from './CardBox.vue';
import axios from 'axios'
import { useMemberStore } from '@/stores/memberStore'
import { computed, ref } from 'vue'

const memberStore = useMemberStore()
async function getMembers() {
    
}
let members = computed(() => memberStore.members.value.value)

function doSomethin() {
    console.log(members)
}
</script>

<template>
    <h1>Membros i membrillos</h1>
    <!-- <div v-for="member in members"> -->
    <button @click="doSomethin"> click me</button>
    <!-- </div> -->
</template>