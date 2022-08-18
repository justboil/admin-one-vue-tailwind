<template>
  <LayoutAuthenticated>
    <SectionTitleBar :title-stack="titleStack" />
    <SectionMain>
        <CardBoxModal
            v-model="isModalActive"
            title="Sample modal"
        >
            <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
            <p>This is sample modal</p>
        </CardBoxModal>

        <CardBoxModal
            v-model="isModalDangerActive"
            large-title="Please confirm"
            button="danger"
            has-cancel
        >
            <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
            <p>This is sample modal</p>
        </CardBoxModal>
        <CardBox
            v-if="itemsPaginated.length > 0"
            has-table
        >
            <table>
            <thead>
                <tr>
                <th />
                <th>ลูกแชร์</th>
                <th>ยอดส่ง</th>
                <th>ส่งแล้ว</th>
                <th>เหลือส่ง</th>
                <th>จำนวนวง</th>
                <th />
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="member in itemsPaginated"
                :key="member.memberId"
                >
                <td class="border-b-0 lg:w-6 before:hidden">
                    <UserAvatar
                    :username="member.memberId"
                    class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
                    />
                </td>
                <td data-label="ลูกแชร์">
                    {{ member.memberName }}
                </td>
                <td data-label="ยอดส่ง">
                    {{ member.sumAmountSend }}
                </td>
                <td data-label="ส่งแล้ว">
                    {{ member.sumAmountSend - member.balance }}
                </td>
                <td data-label="เหลือส่ง">
                    {{ member.balance }}
                </td>
                <td data-label="จำนวนวง">
                    {{ member.numGroup }}
                </td>
                <td class="before:hidden lg:w-1 whitespace-nowrap">
                    <BaseButtons
                    type="justify-start lg:justify-end"
                    no-wrap
                    >
                    <BaseButton
                        color="info"
                        icon="eye"
                        small
                        @click="isModalActive = true"
                    />

                    </BaseButtons>
                </td>
                </tr>
            </tbody>
            </table>
            <div
            class="p-3 lg:px-6 border-t border-gray-100 dark:border-gray-800"
            >
            <BaseLevel>
                <BaseButtons>
                <BaseButton
                    v-for="page in pagesList"
                    :key="page"
                    :active="page === currentPage"
                    :label="page + 1"
                    small
                    @click="currentPage = page"
                />
                </BaseButtons>
                <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
            </BaseLevel>
            </div>
        </CardBox>
        <CardBox v-else empty/>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script>
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import CardBox from '@/components/CardBox.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import DashboardService from '@/services/dashboard'

export default {
    data(){
        return {
            titleStack : ['รายการวันนี้','ยอดส่งวันนี้'],
            isModalActive : false,
            isModalDangerActive : false,
            perPage : 10,
            currentPage : 0,
            checkedRows : [],
            items : []
        }
    },
    created() {
      this.getSends()
    },
    computed : {
      itemsPaginated() {
        return this.items ? this.items.slice(this.perPage * this.currentPage, this.perPage * (this.currentPage + 1)) : []
      },
      numPages(){
        return Math.ceil((this.items ? this.items.length : 0) / this.perPage);
      },
      currentPageHuman() {
        return this.currentPage + 1
      },
      pagesList() {
        const pagesList = []

        for (let i = 0; i < this.numPages; i++) {
          pagesList.push(i)
        }

        return pagesList
      }
    },
    methods: {
      async getSends(){
        const resp = await DashboardService.getDashboardAmountSend();
        if(resp.data){
          this.items = resp.data.data
        }
      }
    },
    components : {
        LayoutAuthenticated,
        SectionMain,
        SectionTitleBar,
        CardBoxModal,
        TableCheckboxCell,
        BaseLevel,
        BaseButtons,
        BaseButton,
        UserAvatar,
        CardBox
    }
}
</script>