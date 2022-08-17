import http from '@/constants/api';
import authHeader from './auth-header'

class MemberService{
    getAll(){
        return http.get(`/member`,{ headers : authHeader()});
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