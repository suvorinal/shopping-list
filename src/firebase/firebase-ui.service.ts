import { firebaseAuthUi } from './init'
import { userService } from './user.service'
import firebase from 'firebase/app'

export const FirebaseUIService = {
    start(id: string) {
        firebaseAuthUi.start(`#${id}`, {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessUrl: '/',
            callbacks: {
                signInSuccessWithAuthResult(
                    authResult: firebase.auth.UserCredential
                ) {
                    if (authResult.user) {
                        userService.createUser(authResult.user.uid, {
                            avatar: authResult.user.photoURL || '',
                            email: authResult.user.email || '',
                            name: authResult.user.displayName || ''
                        })
                    }
                    return true
                }
            }
        })
    }
}
