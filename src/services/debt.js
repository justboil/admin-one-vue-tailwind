import http from '@/constants/api';
import authHeader from './auth-header'
import { setCountDebt } from '@/utils'
import { useMainStore } from '@/stores/main';

const module = '/debt' 
class DebtService{
    getDebts(payload = {}){
        if(!payload.search){
            payload.search = ""
        }
        if(!payload.order){
            payload.order = "DESC"
        }
        if(!payload.sort){
            payload.sort = "sumDebt"
        }
        return http.get(module+'?search='+payload.search+'&order='+payload.order+'&sort='+payload.sort,{ headers : authHeader()})
                .then(response => {
                    setCountDebt(response.data.data.length)
                    useMainStore().setCountDebt(response.data.data.length)
                    return response;
                })
    }
    getDebtDetail(payload = {}){
        if(!payload.search){
            payload.search = ""
        }
        if(!payload.sort){
            payload.sort = "amount_send"
        }
        if(!payload.order){
            payload.order = "DESC"
        }
        return http.get(module+'/'+payload.memberId+'?search='+payload.search+'&sort='+payload.sort+'&order='+payload.order,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    paidGroup(memberId,groupId,paid){
        return http.patch(module+'/paid/'+memberId+'/'+groupId+'/'+paid,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    paid(memberId){
        return http.patch(module+'/paid/'+memberId,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    complete(memberId){
        return http.patch(module+'/complete/'+memberId,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    cancel(memberId){
        return http.patch(module+'/cancel/'+memberId,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
}

export default new DebtService()