import http from '@/constants/api';
import authHeader from './auth-header'

class GroupService{
    createGroup(payload){
        return http.post("/group", payload ,{ headers : authHeader()});
    }
    editGroup(id,payload){
        return http.put(`/group/${id}`, payload,{ headers : authHeader()});
    }
    updateDetails(payload){
        return http.put(`/group`, payload,{ headers : authHeader()});
    }
    deleteGroup(groupId){
        return http.delete(`/group/${groupId}`,{ headers : authHeader()});
    }
    startGroup(payload){
        return http.post(`/group/start`,payload,{ headers : authHeader()});
    }
    loadGroup(id){
        return http.get(`/group/${id}`,{ headers : authHeader()});
    }
    listGroup(search){
        return http.post('/group/list',search,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    getGroupDetailSummary(groupId){
        return http.get(`/group/summary/${groupId}`,{ headers : authHeader()})
                .then(response => {
                    return response;
                })
    }
    getGroupDetailAmount(groupId,detailId,subDetailId){
        return http.get(`/group/amount/${groupId}/${detailId}/${subDetailId}`,{ headers : authHeader()});
    }
}

export default new GroupService();