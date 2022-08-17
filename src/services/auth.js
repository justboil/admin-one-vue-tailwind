import http from '@/constants/api';
import { useMainStore } from '@/stores/main.js'
import { setCurrentUser } from '@/utils'
import DashboardService from '@/services/dashboard'
import DebtService from '@/services/debt'


class AuthService {

    login(user) {
        return http
            .post('/authenticate', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                
                if (response.data) {
                    response.data.data.avatar ='https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
                    setCurrentUser(response.data.data)
                    useMainStore().setUser(response.data.data);
                    DashboardService.getDashboardAmountSend();
                    DashboardService.getDashboardAmountReceive();
                    DashboardService.getBits();
                    DebtService.getDebts();
                }else{
                    console.log('response : ',response)    
                }

                return response.data;
            })
    }

    logout() {
        setCurrentUser(null)
        useMainStore().setUser(null);
    }

    register(user) {
        return http.post("/register", {
            username: user.username,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber
        })
    }

}

export default new AuthService();