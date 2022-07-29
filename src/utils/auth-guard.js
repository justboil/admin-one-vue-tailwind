import { setCurrentUser } from '@/utils'
import { useMainStore } from '@/stores/main'; 

export default (to, from, next) => {
    if (to.matched.some(record => record.meta.loginRequired)) {
        const user = useMainStore().currentUser
        if (user && user.accessToken) {
            next();
        } else {
            setCurrentUser(null)
            next('/login')
        }
    } else {
        next()
    }
  }