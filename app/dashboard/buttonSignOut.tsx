'use client'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase/config'

export default function ButtonSignOut({icon}) {
    const handleSignOut = async () => {
        try{
            await signOut(auth)
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