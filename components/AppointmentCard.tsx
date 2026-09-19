import { AppointmentData, ClientData } from "@/types";
import { clientFetchData } from "@/lib/services/clients";
import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Appointment Data Card
 * In this card we have info about the uncoming appointments, names, associates working on it, dates, status of the leads.
 * @param CardInfo;
 * @returns UI component. -> info about appointments
 */ 
export function AppointmentCard({CardInfo}: {CardInfo: AppointmentData}) {
    const [activeId, setActiveId] = useState<string | null>(null)
 const leadConfig: Record<string, { bg: string; text: string; dot: string }> = {
    hot: { bg: 'bg-hot/30', text: 'text-text-hot', dot: 'bg-hot' },
    warm: { bg: 'bg-warm/30', text: 'text-text-warm', dot: 'bg-warm' },
    cold: { bg: 'bg-cold/30', text: 'text-cold', dot: 'bg-cold' }
};
    const q = CardInfo.coOwnersMeta
    const coOwnersInitials: string[] = [];
    Object.values(q).forEach((userId) => {
        coOwnersInitials.push(userId.initials);
    })
    
    const dateObject = CardInfo.date.toDate();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
    }).format(dateObject);

    const status = CardInfo.leadStatus.toLowerCase();
    const config = leadConfig[status] || leadConfig.cold;
    
    return(<>
        <section className='bg-white border border-text-gray rounded-3xl border-dashed p-4 flex flex-col gap-3'>
            <article className='flex justify-between'>
                <div className='w-4/6'>
                    <span className='font-semibold'>{CardInfo.clientName} {CardInfo.clientLastName}</span>
                </div>
                <div className={`px-2 text-xs h-6 ${config.bg} ${config.text} font-bold  rounded-3xl flex justify-end items-center`}><div className={`w-2 h-2 rounded-full ${config.dot}`}></div>&nbsp;&nbsp;<span>{CardInfo.leadStatus} Lead</span></div>
            </article>
            <article className='flex flex-row gap-1 text-center items-center'>
                {coOwnersInitials.map((initials, index) => (
                    <div  key={index} className='p-2 rounded-full bg-third-transparent text-third font-bold text-xs'>{initials}</div>
                ))}
            </article> 
            <aside className=' text-text-gray'>
                <span>📅 {formattedDate}</span> 
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
        {loading == true ? '' : <section className="bg-dark-accent/80 text-text-primary fixed inset-0 z-50">
            <section className="bg-secondary p-4 rounded-2xl m-8 flex flex-col gap-4">
                <div className="flex justify-end" >
                    <span onClick={onClose}>X</span>
                </div>
                <article className='flex flex-col items-center justify-center'>
                    <h2 className="text-3xl font-semibold">{data?.firstName} {data?.lastName}</h2>
                    <p className="text-xl text-text-secondary italic">{data?.phoneNumber}</p>
                    {/* <span><h3>{clientInfo.id}</h3></span> */}
                </article>
                <article className="">
                    <h2 className="text-xl font-bold pb-2">Notes:</h2>
                    <p className="border rounded-2xl p-4 bg-white ">{data?.notes}</p>
                </article>
                <article className="flex flex-col">
                    <h2 className="text-xl font-bold pb-2">Personal Details</h2>
                    <div>
                        <p>{data?.email}</p>
                    </div>
                    <hr />
                    <p className="text-lg">Address</p>
                    <div className="ml-2 border rounded-2xl p-4 bg-white">
                        <p>{data?.address}</p>
                        <span>{data?.city}, </span>
                        <span>{data?.state}, </span>
                        <span>{data?.zipCode}</span>
                    </div>
                </article>
{/* its not working right now, skip it until we create the feature so users dont get confuse */}
                {/* <article className="text-xl flex justify-around">
                    <button className="py-2 px-6 rounded-2xl bg-hot">Delete</button>
                    <button className="py-2 px-6 rounded-2xl bg-third-light">Update</button>
                </article> */}
            </section>
        </section>
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