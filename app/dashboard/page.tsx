import Link  from 'next/link'
import ButtonSignOut from './buttonSignOut';
import { AppointmentCard } from '../../components/AppointmentCard'
import { AppointmentsFetchData } from '@/lib/services/appointmensts';
import { AppointmentData } from '../types';
export default async function Dashboard(){
    // const appointments = await AppointmentsFetchData()
    const appointments = await AppointmentsFetchData()
     
    return (<>
    <section >
        <h1 className="text-center text-5xl mt-8">Today&apos;s Appointments</h1>
        <section className='grid gap-6 m-4
        sm:grid-cold-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
'>

arreglar el .env y .env.local con las variables necesarias reemplazando ":" por "=" para un correcto uso de variables. 

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
      
      {appointments && appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointments.map((appo) => (
            <li key={appo.id} className="p-4 border rounded shadow-sm">
              <p><strong>ID:</strong> {appo.id}</p>
              {/* Ajusta esto según los campos reales de tu documento */}
              <p><strong>Detalles:</strong> {JSON.stringify(appo)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron citas escritas en Firestore.</p>
      )}
    </div>
            {/* <AppointmentCard/> */}
            {/* //traer datos reales de Firabase */}
            {/* <AppointmentCard/> */}
            {/* <AppointmentCard/> */}
            {/* <AppointmentCard/> */}
            {/* {appointments.map((app) => ( */}
                {/* <AppointmentCard key={app.id}/> */}
                {/* )) */}
            {/* } */}
        </section>
    </section>
    <div>Dashboard</div>
    <Link href='/login'>Loginasdasd</Link>
    <ButtonSignOut />
    </>
)
}

