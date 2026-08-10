import { GoogleButton } from './googleButton'
import Link  from 'next/link'
export default function LoginPage() {
    return <>
        <h1 className='text-2xl '>Ready to Start your Clienteling Success?</h1>
        <p> please log in to continue</p>
        <GoogleButton text='Continue with Google'/>
        <Link href='/dashboard'>Dashboard</Link>
    </>
}

