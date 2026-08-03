'use client'

import React, { createContext, useContext } from "react";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config"
import { useEffect, useState} from 'react'

//observe user state change
// export function AuthObserver() {

//     useEffect(() => {
//         const unsubscribe = onIdTokenChanged(auth, async (user) => {
            
//             if (user) {
//                 try {

//                     const token = await user.getIdToken()
//                     console.log(token)
//                     document.cookie = `session_token=${token}; path=/; max-age=1200; SameSite=Lax; Secure`
//                     // User is signed in, see docs for a list of available properties
//                     // https://firebase.google.com/docs/reference/js/auth.user
//                     // ...
//                 }catch (error) {
//                     console.error("Error getting token:", error);
//                 }
//             } else {
//                 // User is signed out
//                 document.cookie = 'session_token=; path=/; max-age=0; SameSite=Lax; Secure'
//                 console.log('User is signed out')
//                 // ...
//             }
//         });
//         return () => unsubscribe()
//     }, [])
//     return null
// }

interface AuthContextType {
    user : User | null,
    loading : boolean
}

const AuthContext = createContext<AuthContextType>({
    user : null,
    loading : true
})

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading ]= useState(true)

    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, async (user) =>{
            setUser(user)
            setLoading(false)
            if(user){
                const token = await user.getIdToken()
                document.cookie = `session_token=${token}; path=/; max-age=1200; SameSite=Lax; Secure`
            }else{
                document.cookie = `session_token=; path=/; max-age=0; SameSite=Lax; Secure`

            }
        })
        return ()=>unsubcribe()
    },[])
    
    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}