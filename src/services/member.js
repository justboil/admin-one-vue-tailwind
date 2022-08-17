import http from '@/constants/api';
import authHeader from './auth-header'
import { setCountMember } from '@/utils'
import { useMainStore } from '@/stores/main';

class MemberService{
    all(){
        return http.get(`/member`,{ headers : authHeader()})
            .then(response => {
                setCountMember(response.data.data.length)
                useMainStore().setCountMember(response.data.data.length)
                return response;
            });
    }
    getAll(search){
        if(!search){
            search = ""
        }
        return http.get(`/member?search=`+search,{ headers : authHeader()})
    }
    get(id){
        return http.get(`/member/${id}`,{ headers : authHeader()});
    }
    create(payload){
        return http.post(`/member`,payload,{ headers : authHeader()});
    }
    delete(memberId){
        return http.delete(`/member/${memberId}`,{ headers : authHeader()});
    }
    update(memberId,memberNewName){
        return http.put(`/member?memberId=${memberId}&memberNewName=${memberNewName}`,{ headers : authHeader()});
    }
}

export default new MemberService();