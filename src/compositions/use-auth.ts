import { ref, computed } from 'vue'
import { authService } from '../firebase'
import { UserData } from '../firebase'

const userData = ref<UserData | null>(null)

function auth() {
    authService.auth()
}
export const isAuth = computed(() => Boolean(userData.value))

async function getUserData() {
    userData.value = await authService.getUserData()
}

void getUserData()

export function useAuth() {
    return {
        userData,
        auth,
        isAuth
    }
}
