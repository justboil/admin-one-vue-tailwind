import { useMainStore } from '@/stores/main'

export default function authHeader() {
    let user = useMainStore().currentUser;

    if (user && user.accessToken) {
        return { 
            Authorization: user.accessToken
        };
    } else {
        return {};
    }
}