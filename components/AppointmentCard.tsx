import { AppointmentData, ClientData } from "@/types";
import { clientFetchData } from "@/lib/services/clients";
import { useEffect, useState } from "react";

/**
 * Appointment Data Card
 * In this card we have info about the uncoming appointments, names, associates working on it, dates, status of the leads.
 * @param CardInfo;
 * @returns UI component. -> info about appointments
 */ 
export function AppointmentCard({CardInfo}: {CardInfo: AppointmentData}) {
    const [activeId, setActiveId] = useState<string | null>(null)
    const leadColors:Record<string,string> = {
        hot: 'bg-hot via-red-100',
        warm: 'bg-warm via-yellow-100',
        cold: 'bg-cold via-blue-100'
    }
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

    const bgInitial = [
        'bg-Owner-1',
        'bg-Owner-2',
        'bg-Owner-3'
    ]
    const gradientColors = leadColors[CardInfo.leadStatus.toLowerCase()];
    return(<>
        <section className={`relative p-2 bg-linear-to-b ${gradientColors} to-white rounded-3xl border-gray-200 border min-w-75`} onClick={()=> {setActiveId(CardInfo.id)}}>
            <article className='text-center text-ls font-bold'>
                <span>{CardInfo.leadStatus} Lead</span>
            </article>
            <article className='bg-secondary border-dashed border-gray-500 border h-32 flex flex-col justify-between p-4 rounded-3xl'>
                <div className="text-2xl">{CardInfo.clientName} {CardInfo.clientLastName}</div>
                <div className='flex flex-row justify-between items-center'>
                    <article className='flex flex-row gap-2 text-center items-center'>
                        {coOwnersInitials.map((initials, index) => (
                            <div  key={index} className={`${bgInitial[index]} p-2 rounded-full`}>{initials}</div>
                        ))}
                    </article>            
                </div>
            </article>
            <aside className='p-4 flex text-2xl text-text-secondary font-light justify-end'>
                <span className=''>{formattedDate}</span> 
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
