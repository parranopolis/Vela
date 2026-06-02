import Link  from 'next/link'
import { signOut } from 'firebase/auth'
import {auth} from '../../lib/firebase/config'
import ButtonSignOut from './buttonSignOut';
export default function Dashboard(){
    return (<>
    <div>Dashboard</div>
    <Link href='/login'>Login</Link>
    <ButtonSignOut />
    </>
)
}