interface LeadData {
  name: string;
  lastName: string;
  date: string;
  associates: string[];
  leadStatus: 'Hot' | 'Warm' | 'Cold'; // Litera types prevent spelling bugs
}


export function AppointmentCard() {
    const leadColors:Record<string,string> = {
        hot: 'from-red-500 via-red-100',
        warm: 'from-yellow-500 via-yellow-100',
        cold: 'from-blue-500 via-blue-100'
    }

    const data: LeadData = {
        name: "Jose",
        lastName: 'Guzman',
        date: 'September, 27',
        associates: ['SP','WT'],
        leadStatus: 'Cold',
    }
    const gradientColors = leadColors[data.leadStatus.toLowerCase()] || leadColors.hot;
    return(<>
        <section className={`p-2 bg-linear-to-b ${gradientColors} to-white rounded-3xl border-gray-200 border min-w-75`}>
            <article className='text-center text-ls font-bold'>
                <span>{data.leadStatus} Lead</span>
            </article>
            {/* bg-[#e9edf5] */}
            <article className='bg-gray-200 border-dashed border-gray-500 border h-32 flex flex-col justify-between p-4 rounded-3xl'>
                <div className="text-2xl">{data.name} {data.lastName}</div>
                <div className='flex flex-row justify-between items-center'>
                    <article className='flex flex-row gap-2 text-center items-center'>
                        <div className='bg-green-400 p-2 rounded-full'>{data.associates[0]}</div>
                        <div className='bg-blue-400 p-2 rounded-full'>{data.associates[1]}</div>
                        {/* <div className='bg-amber-600 p-2 rounded-full'>AH</div> */}
                    </article>            
                </div>
            </article>
            <aside className='p-4 flex text-2xl text-gray-400 font-light justify-end'>
                <span className=''>{data.date}</span> 
                {/* esta fecha es de cuando se hizo la cita. */}
            </aside>
        </section>
    </>)
}