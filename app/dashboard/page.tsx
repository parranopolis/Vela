import Link  from 'next/link'
// import { signOut } from 'firebase/auth'
// import {auth} from '../../lib/firebase/config'
import ButtonSignOut from './buttonSignOut';
import { AppointmentCard } from '../../components/AppointmentCard'
export default function Dashboard(){
    
    return (<>
    <section >
        <h1 className="text-center text-5xl mt-8">Today&apos;s Appointments</h1>
        <section className='grid gap-6 m-4
        sm:grid-cold-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
'>
            <AppointmentCard/>
            <AppointmentCard/>
            <AppointmentCard/>
            <AppointmentCard/>
        </section>
    </section>
    <div>Dashboard</div>
    <Link href='/login'>Loginasdasd</Link>
    <ButtonSignOut />
    </>
)
}

