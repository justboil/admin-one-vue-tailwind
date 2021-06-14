<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>
    Tables
    <template #right>
      <router-link to="/" class="button light">
        Dashboard
      </router-link>
    </template>
  </hero-bar>
  <main-section>
    <notification color="blue">
      <div>
        <icon icon="buffer" />
        <b>Responsive table.</b>
      </div>
    </notification>

    <card-component
      :has-table="true"
      title="Clients"
      icon="account-multiple"
    >
      <clients-table :checkable="true" />
    </card-component>

    <notification color="green">
      <div>
        <icon icon="buffer" />
        <b>Tightly wrapped</b> &mdash; table header becomes card header
      </div>
    </notification>

    <card-component :has-table="true">
      <clients-table :checkable="true" />
    </card-component>

    <notification color="red">
      <div>
        <icon icon="buffer" />
        <b>Empty table.</b> When there's nothing to show
      </div>
    </notification>

    <card-component :is-empty="true"/>
  </main-section>
</template>

<script>
import { ref } from 'vue'
import MainSection from '@/components/MainSection'
import Notification from '@/components/Notification'
import ClientsTable from '@/components/ClientsTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Icon from '@/components/Icon'

export default {
  name: 'Tables',
  components: {
    MainSection,
    HeroBar,
    TitleBar,
    CardComponent,
    ClientsTable,
    Notification,
    Icon
  },
  setup () {
    const titleStack = ref(['Admin', 'Tables'])

    return {
      titleStack
    }
  }
}
</script>
