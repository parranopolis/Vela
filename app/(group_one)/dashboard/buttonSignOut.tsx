'use client'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import React from 'react';

export default function ButtonSignOut({icon} : {icon: React.ReactNode}) {
    const handleSignOut = async () => {
        try{
            await signOut(auth)
            document.cookie = "session_token=; path=/; max-age=0; SameSite=Lax; Secure";
            window.location.href = '/login'
            console.log('User signed out successfully')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }    
    return (
        <>
        <button onClick={handleSignOut}>{icon}</button>
        </>
    )
}