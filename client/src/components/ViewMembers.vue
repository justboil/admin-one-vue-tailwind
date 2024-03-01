<script setup>
import CardBox from './CardBox.vue';
import axios from 'axios'
import { useMemberStore } from '@/stores/memberStore'
import { computed, ref } from 'vue'

const memberStore = useMemberStore()

let members = computed(() => memberStore.members)
</script>

<template>
    <h1>Membros i membrillos</h1>
    <div v-for="member in members">
    {{ member.firstname || member.commercialName1 }}
    </div>
</template>