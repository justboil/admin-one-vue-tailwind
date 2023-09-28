import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {
  const userName = ref('john doe')
  const userEmail = ref('john@example.com')
  const userAvatar = ref('https://avatars.dicebear.com/api/avataaars/example.svg')

  // ... or you can use computed:
  // const userAvatar = computed(
  //   () =>
  //     `https://avatars.dicebear.com/api/avataaars/${userName.value.replace(
  //       /[^a-z0-9]+/i,
  //       ''
  //     )}.svg`
  // )

  const isFieldFocusRegistered = ref(false)

  const clients = ref([])
  const history = ref([])

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
    if (payload.avatar) {
      userAvatar.value = payload.avatar
    }
  }

  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json`)
      .then((result) => {
        clients.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
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
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    setUser,
    fetchSampleClients,
    fetchSampleHistory
  }
})
