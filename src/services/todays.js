import http from '@/constants/api';
import authHeader from './auth-header'
import { setCountSendToday,setCountReceiveToday } from '@/utils'
import { useMainStore } from '@/stores/main';


const module = '/toDay' 
class ToDaysService{
    getToDayAmountReceive(){
        return http.get(module + '/amountReceive',{ headers : authHeader()})
                .then(response => {
                    setCountReceiveToday(response.data.data.length)
                    useMainStore().setCountReceiveToday(response.data.data.length)
                    return response;
                })
    }
    getToDayAmountReceiveDetail(){
        return http.get(module + '/amountReceiveDetail',{ headers : authHeader()})
                .then(response => {
                    setCountReceiveToday(response.data.data.length)
                    useMainStore().setCountReceiveToday(response.data.data.length)
                    return response;
                })
    }
}

export default new ToDaysService()