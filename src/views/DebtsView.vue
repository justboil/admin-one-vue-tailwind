<template>
  <LayoutAuthenticated>
    <SectionTitleBar :title-stack="titleStack" />
    <SectionMain>
        <TableDebt/>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import TableDebt from '@/components/TableDebt.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'

export default {
    data(){
        return {
            titleStack : ['ยอดค้างจ่าย']
        }
    },
    components : {
        TableDebt,
        LayoutAuthenticated,
        SectionMain,
        SectionTitleBar
    }
}
</script>