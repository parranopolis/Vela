'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { AppointmentFetchData } from '@/lib/services/appointmensts'
import {AppointmentCard} from '../../components/AppointmentCard'
import { AppointmentData } from '../types';
import { LoadingSpinner } from '@/components/loading'

interface rulesStructure {
      title : string,
      category: string,
      saleStatus: string,
      noDataMessage : string
}

//Here are all the appointments for the actual day
export function DashboardClients({rules} : {rules: rulesStructure}) {

    const { user } = useAuth()
    const [appointments, setAppointments] = useState<AppointmentData[]>([])
    const [isLoading, setIsLoading ] = useState(true)

    useEffect(()=>{
        if(!user) return
            AppointmentFetchData(user.uid, rules.saleStatus)
            .then((data) => {
                if(data) {
                    setAppointments(data)
                    setIsLoading(false)
                }
                })
            .catch(console.error)
    },[user, rules.saleStatus])

    return <>
            <section >
                <h1 className="text-center text-3xl mt-8">{rules.title}</h1>
                <section className='grid gap-6
                sm:grid-cold-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                '>
                    <div className="p-6">
                        {isLoading ? <LoadingSpinner/> : <>
                        {appointments && appointments.length > 0 ? (
                            <ul className="space-y-2">

                            {appointments.map((cardInfo) => (
                                <AppointmentCard key={cardInfo.id} CardInfo={cardInfo} />
                            ))}
                            </ul>
                        ) : (
                            <p>{rules.noDataMessage}</p>
                        )} 
                        </>}
                    </div>
                </section> 
            </section> 
    </>
}