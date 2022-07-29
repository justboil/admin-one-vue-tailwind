<template>
  <LayoutAuthenticated>
    <SectionTitleBar :title-stack="titleStack" />
    <SectionMain>
        <TableSendToday/>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import TableSendToday from '@/components/TableSendToday.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'

export default {
    data(){
        return {
            titleStack : ['รายการวันนี้','ยอดส่งวันนี้']
        }
    },
    components : {
        TableSendToday,
        LayoutAuthenticated,
        SectionMain,
        SectionTitleBar
    }
}
</script>