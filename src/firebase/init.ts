import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebaseui/dist/firebaseui.css'
import { firebaseConfig } from '../../firebase.config'

firebase.initializeApp(firebaseConfig)

export const database = firebase.firestore()

void database.enablePersistence()

export const auth = firebase.auth()
export const firebaseAuthUi = new firebaseui.auth.AuthUI(auth)
