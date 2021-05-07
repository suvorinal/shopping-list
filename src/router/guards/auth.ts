import { authService } from 'src/firebase'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    if (await authService.isAuth()) next()
    else next('login')
}

export async function guestGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    if (await authService.isAuth()) next('/')
    else next()
}
