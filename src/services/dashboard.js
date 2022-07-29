import http from '@/constants/api';
import authHeader from './auth-header'
import { setCountSendToday,setCountReceiveToday } from '@/utils'
import { useMainStore } from '@/stores/main';

const module = '/dashboard' 
class DashboardService{
    getDashboard(){
        return http.get(module,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    getDashboardAmountSend(){
        return http.get(module + '/amountSend',{ headers : authHeader()})
                .then(response => {
                    setCountSendToday(response.data.data.length)
                    useMainStore().setCountSendToday(response.data.data.length)
                    return response;
                })
    }
    getDashboardAmountReceive(){
        return http.get(module + '/amountReceive',{ headers : authHeader()})
                .then(response => {
                    setCountReceiveToday(response.data.data.length)
                    useMainStore().setCountReceiveToday(response.data.data.length)
                    return response;
                })
    }
    received(payload,received){
        return http.patch(module + `/received/amountReceive/${received}`,payload,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    getDashboardAmountSendDetail(memberId){
        return http.get(module + `/amountSend/details/${memberId}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    getDashboardAmountReceiveDetail(memberId){
        return http.get(module + `/amountReceive/details/${memberId}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    updatePaidAmountSendByMember(memberId){
        return http.patch(module +`/paid/amountSend/${memberId}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    updateCancelAmountSendByMember(memberId){
        return http.patch(module +`/cancel/amountSend/${memberId}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    updatePaidAmountSend(){
        return http.patch(module + '/paid/amountSend',{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    updateCancelAmountSend(){
        return http.patch(module + '/cancel/amountSend',{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    updateCompleteAmountSend(){
        return http.patch(module + '/complete/amountSend',{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    paidAmountSendByMemberAndGroup(groupId,memberId,paid){
        return http.patch(module + `/paid/amountSend/${memberId}/${groupId}/${paid}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    cancelAmountSendByMemberAndGroup(groupId,memberId){
        return http.patch(module + `/cancel/amountSend/${memberId}/${groupId}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    completedAmountSendByMemberAndGroup(memberId,groupId){
        return http.patch(module + `/completed/amountSend/${memberId}` + (groupId != null ? `/${groupId}`: ``),{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    getBits(){
        return http.get(module + `/bits`,{ headers : authHeader()})
                .then(response => {
                    setCountBitToday(response.data.data.length)
                    useMainStore().setCountBitToday(response.data.data.length)
                    return response;
                })
    }
    bited(id,amount){
        return http.put(module + `/bited/${id}/${amount}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    cancelBit(id){
        return http.put(module + `/cancel/bit/${id}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
}

export default new DashboardService()