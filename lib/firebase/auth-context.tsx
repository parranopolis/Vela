'use client'
import {onAuthStateChanged } from "firebase/auth";
import { auth } from "./config"
import { useEffect} from 'react'
//observe user state change
export function AuthObserver() {

    useEffect(() => {
        const unsubscribe =onAuthStateChanged(auth, (user) => {
            
            if (user) {
                console.log('testing')
                const token = user.getIdToken()
                document.cookie = `session_token=${token}; path=/; max-age=1200; SameSite=Lax; Secure`
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // ...
            } else {
                // User is signed out
                document.cookie = 'session_token=; path=/; max-age=0; SameSite=Lax; Secure'
                console.log('User is signed out')
                // ...
            }
        });
        return () => unsubscribe()
    }, [])
    return null
}