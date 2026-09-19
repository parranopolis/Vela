import { AppointmentData, ClientData } from "@/types";
import { clientFetchData } from "@/lib/services/clients";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {Timestamp} from "firebase/firestore"

/**
 * Appointment Data Card
 * In this card we have info about the uncoming appointments, names, associates working on it, dates, status of the leads.
 * @param CardInfo;
 * @returns UI component. -> info about appointments
 */ 
export function AppointmentCard({CardInfo}: {CardInfo: AppointmentData}) {
    const [activeId, setActiveId] = useState<string | null>(null)

    


    return(<>
        <section className='bg-white border border-text-gray rounded-3xl border-dashed p-4 flex flex-col gap-3' onClick={() => setActiveId(CardInfo.clientId)}>
            <article className='flex justify-between'>
                <div className='w-4/6'>
                    <span className='font-semibold'>{CardInfo.clientName} {CardInfo.clientLastName}</span>
                </div>
                <BadgeLeadStatus leadStatus={CardInfo.leadStatus} />
            </article>
            <article className='flex flex-row gap-1 text-center items-center'>
                <CoOwnersInitials coOwnersMeta={CardInfo.coOwnersMeta} />
            </article> 
            <aside className='text-text-gray'>
                <div>{formatDate(CardInfo.date)}</div>
            </aside>
        </section>
        {activeId && (
            <OpenAppointmentDetails clientInfo={CardInfo} onClose={()=> setActiveId(null)}/>
        )
        }
    </>)
}


// Appointment Card Details
// Here, is the full info about the appointment, client data, notes, last interacctions, assiates, owners. 
// gets active once we click in the parent component.

interface OpenAppointmentDetails {
    clientInfo: AppointmentData,
    onClose : () => void
}

function OpenAppointmentDetails({clientInfo, onClose}: OpenAppointmentDetails) {

    const [data,setData] = useState<ClientData | null>(null)
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        async function loadingData() {
            setLoading(true)
            try{
                const response = await clientFetchData(clientInfo.clientId) as ClientData
                setData(response)
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        loadingData()
    },[clientInfo.clientId])
    return (
        <>
        {loading == true ? '' : <>
            <motion.section
            className="bg-dark-accent/80 text-text-primary fixed inset-0 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
            <motion.section className="bg-secondary rounded-2xl m-8 flex flex-col mx-auto w-3/4 lg:max-w-3/6">
                {/* Names and exit button */}
                <article className='flex justify-between items-center bg-third rounded-t-2xl text-white p-6'>
                    <div className="flex justify-end flex-col" >
                        <h2 className="text-3xl font-semibold">{data?.firstName} {data?.lastName}</h2>
                        <h4 className="text-sm">Appointment information</h4>
                    </div>
                    <div>
                        <ion-icon onClick={onClose} className="text-3xl" name="close-circle-outline"></ion-icon>
                    </div>
                </article>
                {/* CoOwners and Lead Status */}
                <section className='p-4 flex flex-col gap-4'>
                    <article className='flex flex-row justify-between items-center gap-2'>
                        <div>
                            <span className="text-xs">Sale Owners</span>
                            <CoOwnersInitials coOwnersMeta={clientInfo.coOwnersMeta} />
                        </div>
                        <BadgeLeadStatus leadStatus={clientInfo.leadStatus} />
                    </article>
                        <p className='text-text-gray'>{formatDate(clientInfo.date)}</p>
                        <h2 className="text-lg">Notes</h2>
                    <article className="">
                        <p className="shadow rounded-2xl p-4 bg-white ">{data?.notes}</p>
                    </article>
                        <h2 className="text-lg">Contact</h2>
                    <section className='bg-white rounded-2xl shadow'> 
                        <article className="flex flex-col
                        md:flex-row md:justify-between 
                        p-4 border-b border-text-gray/40">
                            {data?.email == '' ? '' : <div className='flex md:justify-center items-center'><ion-icon name="mail-outline"></ion-icon>&nbsp;{data?.email}</div>}
                            <div className='flex md:justify-center items-center'><ion-icon name="call-outline"></ion-icon>&nbsp;{data?.phoneNumber}</div>
                        </article>
                        {data?.state == '' ? '' : (
                            <article className="bg-white flex items-center rounded-b-2xl p-4">                        
                            <ion-icon name="location-outline"></ion-icon>
                            <span>{data?.address}</span>
                            <span>{data?.city}, </span>
                            <span>{data?.state}, </span>
                            <span>{data?.zipCode}</span>
                        </article>
                        )}
                    </section>
                </section>
                {/* its not working right now, skip it until we create the feature so users dont get confuse */}
                {/* <article className="text-xl flex justify-around">
                    <button className="py-2 px-6 rounded-2xl bg-hot">Delete</button>
                    <button className="py-2 px-6 rounded-2xl bg-third-light">Update</button>
                </article> */}
            </motion.section>
        </motion.section>
        </>
        }
        </>
    )
}

export function NoAppointmentsCard({message}: {message: string}) {
    return (
        <article className='text-center border-text-gray border bg-white border-dashed rounded-3xl py-8 px-4'>
            <p><ion-icon name="checkmark-circle-outline"></ion-icon></p>
            <p className="font-semibold">{message}</p>
            <p>You&apos;re all caught up!. <span className="text-text-muted font-semibold"><Link href="/newentry/scanner"> Scan a client sheet</Link></span> to add one.</p>
        </article>
    )
}


function CoOwnersInitials({coOwnersMeta}: {coOwnersMeta: Record<string, { initials: string }>}) {
      const q = coOwnersMeta
    const coOwnersInitials: string[] = [];
    Object.values(q).forEach((userId) => {
        coOwnersInitials.push(userId.initials);
    })

    return (
        <div className='flex flex-row gap-1 text-center items-center'>
            {coOwnersInitials.map((initials, index) => (
                <div  key={index} className='p-2 rounded-full bg-third-transparent text-third font-bold text-xs'>{initials}</div>
            ))}
        </div>
    );
}

function BadgeLeadStatus({leadStatus}: {leadStatus: string}) {
 const leadConfig: Record<string, { bg: string; text: string; dot: string }> = {
    hot: { bg: 'bg-hot/30', text: 'text-text-hot', dot: 'bg-hot' },
    warm: { bg: 'bg-warm/30', text: 'text-text-warm', dot: 'bg-warm' },
    cold: { bg: 'bg-cold/30', text: 'text-cold', dot: 'bg-cold' }
};
    const status = leadStatus.toLowerCase();
    const config = leadConfig[status] || leadConfig.cold;
    return (
        <div className={`px-2 text-xs h-6 ${config.bg} ${config.text} font-bold  rounded-3xl flex justify-end items-center`}><div className={`w-2 h-2 rounded-full ${config.dot}`}></div>&nbsp;&nbsp;<span>{leadStatus} Lead</span></div>
    )
}

function formatDate(date: Timestamp): JSX.Element {
    // Verificación de seguridad por si la fecha viene vacía
    if (!date?.toDate) {
        return <span>Start: N/A</span>;
    }

    const dateObject = date.toDate();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }).format(dateObject);

    return (
        <span className="flex items-center gap-1">
            <ion-icon className='text-black font-bold' name="calendar-outline"></ion-icon>
            <span className='text-text-gray'>{formattedDate}</span>
        </span>
    );
}