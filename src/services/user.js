import http from '@/constants/api';
import authHeader from './auth-header';

const module = '/user';

class UserService {

  getUser() {
    return http.get(module, { headers: authHeader() });
  }

  updateNameHome(nameHome,username) {
    return http.put(module +`?username=${username}&name=${nameHome}`,{ headers : authHeader()})
          .then(response => {
              return response;
          })
  }

}

export default new UserService();