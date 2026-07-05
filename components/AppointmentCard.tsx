import { AppointmentData } from "@/app/types";

interface LeadData {
  name: string;
  lastName: string;
  date: string;
  associates: string[];
  leadStatus: 'Hot' | 'Warm' | 'Cold'; // Litera types prevent spelling bugs
}


export function AppointmentCard({CardInfo}: {CardInfo: AppointmentData}) {
    const leadColors:Record<string,string> = {
        hot: 'from-red-500 via-red-100',
        warm: 'from-yellow-500 via-yellow-100',
        cold: 'from-blue-500 via-blue-100'
    }
    const q = CardInfo.coOwnersMeta
    const coOwnersInitials: string[] = [];
    Object.values(q).forEach((userId) => {
        coOwnersInitials.push(userId.initials);
    })
    
    const dateObject = CardInfo.createdAt.toDate();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
    }).format(dateObject);

    const bgInitial = [
        'bg-green-400',
        'bg-blue-400',
        'bg-amber-600'
    ]
    const gradientColors = leadColors[CardInfo.leadStatus.toLowerCase()] || leadColors.hot;
    return(<>
        <section className={`p-2 bg-linear-to-b ${gradientColors} to-white rounded-3xl border-gray-200 border min-w-75`}>
            <article className='text-center text-ls font-bold'>
                <span>{CardInfo.leadStatus} Lead</span>
            </article>
            {/* bg-[#e9edf5] */}
            <article className='bg-gray-200 border-dashed border-gray-500 border h-32 flex flex-col justify-between p-4 rounded-3xl'>
                <div className="text-2xl">{CardInfo.clientName} {CardInfo.clientLastName}</div>
                <div className='flex flex-row justify-between items-center'>
                    <article className='flex flex-row gap-2 text-center items-center'>
                        {coOwnersInitials.map((initials, index) => (
                            <div  key={index} className={`${bgInitial[index]} p-2 rounded-full`}>{initials}</div>
                        ))}
                    </article>            
                </div>
            </article>
            <aside className='p-4 flex text-2xl text-gray-400 font-light justify-end'>
                <span className=''>{formattedDate}</span> 
                {/* esta fecha es de cuando se hizo la cita. */}
            </aside>
        </section>
    </>)
}