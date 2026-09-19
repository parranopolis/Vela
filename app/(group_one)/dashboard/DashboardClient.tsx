'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { AppointmentFetchData } from '@/lib/services/appointmensts'
import {AppointmentCard, NoAppointmentsCard } from '@/components/AppointmentCard'
import { AppointmentData } from '@/types';
import { LoadingSpinner } from '@/components/loading'

import { AnimatePresence, motion } from 'framer-motion'

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
    const [isCollapsed, setIsCollapsed] = useState(false)

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
    console.log(appointments)

    return <>
            <section className=' break-inside-avoid overflow-hidden'>
                {/* title and collapse button */}
                

                <h3 onClick={() => setIsCollapsed(!isCollapsed)} className="text-center text-2xl"
                    ><motion.div
                    style={{ display: 'inline-block', marginRight: '0.5rem' }}    
                    initial={{ rotate: 0 }}
                        animate={{ rotate: isCollapsed ? -90 : 0 }}
                        transition={{ duration: 0.4 }}
                        
                    ><ion-icon name="chevron-down-outline"></ion-icon></motion.div>{rules.title}</h3>

                {/* Card Component */}
                <AnimatePresence>

                {!isCollapsed ? <motion.div className={`py-2`} id={rules.category} 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4 }}

                >
                        {isLoading ? <LoadingSpinner/> : <>
                            {isCollapsed ? null :     appointments && appointments.length > 0 ? (
                                <ul className="space-y-2">
                                    {appointments.map((cardInfo) => (<AppointmentCard key={`${cardInfo.id}+${cardInfo.createdAt}`} CardInfo={cardInfo} />))}
                                </ul>
                            ) : (
                                <NoAppointmentsCard message={rules.noDataMessage} />
                            )} 
                        </>}
                    </motion.div> : null
                }
                </AnimatePresence>
                </section> 
    </>
}



