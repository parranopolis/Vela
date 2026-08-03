'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/firebase/auth-context'
import { AppointmentFetchData } from '@/lib/services/appointmensts'
import {AppointmentCard} from '../../components/AppointmentCard'
import { AppointmentData } from '../types';

interface rulesStructure {
      title : string,
      category: string,
      saleStatus: string,
}

//Here are all the appointments for the actual day
export function DashboardClients({rules} : {rules: rulesStructure}) {

    const { user } = useAuth()
    const [appointments, setAppointments] = useState<AppointmentData[]>([])

    useEffect(()=>{
        if(!user) return
            AppointmentFetchData(user.uid, rules.saleStatus)
            .then((data) => {
                // console.log(data)
                if(data) setAppointments(data)
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
                        <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
                        {appointments && appointments.length > 0 ? (
                            <ul className="space-y-2">

                            {appointments.map((cardInfo) => (
                                <AppointmentCard key={cardInfo.id} CardInfo={cardInfo} />
                            ))}
                            </ul>
                        ) : (
                            <p>No se encontraron citas escritas para hoy.</p>
                        )} 
                    </div>
                </section> 
            </section> 
    </>
}

// //Here are all the appointments where the client was called and a voicemail was left, or the client requested to reschedule.
// export function PendingCallback (){
//     return <>
//         <section>
//             <h1 className="text-center text-3xl mt-8">Pending Callback</h1>
//     <section className='grid gap-6
//                 sm:grid-cold-1 
//                 md:grid-cols-2 
//                 lg:grid-cols-3 
//                 xl:grid-cols-4 
//                 '>
//                     <div className="p-6">
//                         <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
//                         {/* {appointments && appointments.length > 0 ? (
//                             <ul className="space-y-2">

//                             {appointments.map((cardInfo) => (
//                                 <AppointmentCard key={cardInfo.id} CardInfo={cardInfo} />
//                             ))}
//                             </ul>
//                         ) : (
//                             <p>No se encontraron citas escritas para hoy.</p>
//                         )}  */}
//                     </div>
//                 </section>
//         </section>
//     </>
// }//Here are all the appointments for which the employee did not make the call.
// export function FollowUP (){
//     return <>
//     <section>
//         <h1 className="text-center text-3xl mt-8">Follow Up</h1>
//         <section className='grid gap-6
//                 sm:grid-cold-1 
//                 md:grid-cols-2 
//                 lg:grid-cols-3 
//                 xl:grid-cols-4 
//                 '>
//                     <div className="p-6">
//                         <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
//                         {/* {appointments && appointments.length > 0 ? (
//                             <ul className="space-y-2">

//                             {appointments.map((cardInfo) => (
//                                 <AppointmentCard key={cardInfo.id} CardInfo={cardInfo} />
//                             ))}
//                             </ul>
//                         ) : (
//                             <p>No se encontraron citas escritas para hoy.</p>
//                         )}  */}
//                     </div>
//                 </section>
//     </section>
    
//     </>

// }