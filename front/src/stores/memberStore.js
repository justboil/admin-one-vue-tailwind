import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMemberStore = defineStore('member', () => {

  let members = ref([])



const sampleProjectes = ref([
  {id: 1, nom: "Projecte 1", responsable: "Usuària 4", client: "La Natural"},
  {id: 2, nom: "Projecte 2", responsable: "Usuària 4", client: "Ajuntament de Terrassa"}
])

  function setUser(payload) {
    if (payload.firstname) {
      userName.value = payload.firstname
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
  }

 async function fetchMembers() {
    try {
      const results = await axios('api/members/totis')
      members.value = await results?.data?.data

    } catch(error) {
        alert(error.message)
    }
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return {
    members,
    sampleProjectes,
    history,
    setUser,
    fetchMembers,
    fetchSampleHistory
  }
})
