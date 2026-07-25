'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { AppointmentsFetchData } from '@/lib/services/appointmensts'
import {AppointmentCard} from '../../components/AppointmentCard'
import { AppointmentData } from '../types';

export function DashboardClient() {

    const { user } = useAuth()
    const [appointments, setAppointments] = useState<AppointmentData[]>([])
    
    useEffect(()=>{
        if(!user) return
        AppointmentsFetchData(user.uid)
      .then((data) => {
        if(data) setAppointments(data)
      })
      .catch(console.error)
    },[user])

    return <>
         <h1>Este es el nuevo Dashboard.</h1> 
        <main>
            <section >
                <h1 className="text-center text-5xl mt-8">Today&apos;s Appointments</h1>
                <section className='grid gap-6 m-4
                sm:grid-cold-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                '>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
                        {appointments && appointments.length > 0 ? (
                            <ul className="space-y-2">

                            {appointments.map((cardInfo) => (
                                <AppointmentCard key={cardInfo.id} CardInfo={cardInfo} />
                            ))}
                            </ul>
                        ) : (
                            <p>No se encontraron citas escritas en Firestore.</p>
                        )} 
                    </div>
                </section> 
            </section> 
            <div>Dashboard</div> 
            {/* <Link href='/login'>Loginasdasd</Link> 
            <ButtonSignOut /> 
            */}
        </main> 
    </>
}
