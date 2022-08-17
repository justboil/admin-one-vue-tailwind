<template>
  <LayoutAuthenticated>
    <SectionTitleBar :title-stack="titleStack" />
    <SectionMain>
        <TableDebtDetail/>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import TableDebtDetail from '@/components/TableDebtDetail.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'

export default {
    data(){
        return {
            titleStack : ['ยอดค้างจ่าย','รายละเอียด']
        }
    },
    components : {
        TableDebtDetail,
        LayoutAuthenticated,
        SectionMain,
        SectionTitleBar
    }
}
</script>