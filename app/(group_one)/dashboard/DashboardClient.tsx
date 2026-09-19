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
    const [isLegendOpen, setIsLegendOpen] = useState(false)

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
            <section className=' break-inside-avoid overflow-hidden'>
                {/* title and collapse button */}
                

                <h3  className="text-center text-2xl"
                    ><motion.div
                    style={{ display: 'inline-block', marginRight: '0.5rem' }}    
                    initial={{ rotate: 0 }}
                        animate={{ rotate: isCollapsed ? -90 : 0 }}
                        transition={{ duration: 0.4 }}
                        
                    ><ion-icon onClick={() => setIsCollapsed(!isCollapsed)} name="chevron-down-outline"></ion-icon></motion.div><span onClick={() => setIsCollapsed(!isCollapsed)}>{rules.title}</span>
                    <span className='text-text-gray text-lg' onClick={() => setIsLegendOpen(!isLegendOpen)}><ion-icon name="help-circle-outline"></ion-icon></span>
                </h3>

                <AnimatePresence>
                    {isLegendOpen && (
                        <>
                            <motion.div 
                            className="bg-dark-accent/80 text-text-primary fixed inset-0 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            />
                            <motion.div
                                className="fixed inset-x-4 top-1/4 z-50 max-w-md mx-auto bg-dark-accent p-6 rounded-xl shadow-xl text-text-primary"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}>
                                <h3 className="text-lg text-white font-bold mb-2">Status legend</h3>
                                <p className="text-sm text-gray-300 mb-4"></p>
                                <ul className='text-white list-disc list-inside pl-5 space-y-2 mb-4'>
                                    <li>Today - Today&apos;s Appointments</li>
                                    <li>Upcoming - Future Appointments</li>
                                    <li>Follow Up - None of the calls were made on the specific day (you forgot to call).</li>
                                    <li>Pending For Callback - The call was made, but the client did not answer or asked to reschedule.</li>
                                </ul>
                            <button 
                                onClick={() => setIsLegendOpen(false)}
                                className="px-3 py-1 bg-gray-700 text-white rounded text-sm m-auto"
                            >
                                Close
                            </button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
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



