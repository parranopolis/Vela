
// import { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { cookies } from 'next/headers' 
// import { getServerAuth } from '@/lib/firebase/config';
// import Link  from 'next/link'
// import ButtonSignOut from './buttonSignOut';
// import { AppointmentCard } from '../../components/AppointmentCard'
import { DashboardClients } from './DashboardClient'
import { NavBar } from '@/components/bar'
// import { AppointmentsFetchData } from '@/lib/services/appointmensts';
export default async function Dashboard(){
  const rules = {
    today_appointment : {
      title : 'Today Appointment',
      category: 'today_appointment',
      saleStatus: 'set_up',
    },
    follow_up : {
      title : 'Follow Up',
      category: 'follow_up',
      saleStatus: 'follow_up', // mirar esto, el follow up es para cualquier fecha vencida, no importa el status.
    },
    pending_callback: {
      title : 'Pending For a Callback',
      category: 'pending_callback',
      saleStatus: 'pending_callback',
    }
    // saleStatus: 'set_up' | 'pending_callback' | 'discarted' | 'sale_closed'

  }
  return <>
    <NavBar/>
    <section className='grid '>
      <article className='today_appointment'>
        <DashboardClients rules={rules.today_appointment}/>
      </article>
      <article className='follow_up'>
        <DashboardClients rules={rules.follow_up}/>
      </article>
      <article className='pending_callback'>
        <DashboardClients rules={rules.pending_callback}/>
      </article>
    </section>
    {/* <Link href='/login'>Login</Link> */}
    {/* <ButtonSignOut /> */}
  </>
  

    // //check if the token is valid. 
    // const cookieStore = await cookies()
    // const sessionToken = cookieStore.get('session_token')?.value

    // if(!sessionToken) <section className='border'>Acces Denied</section>
    
    // try{
    //   // create a secure server auththentication instance using the token
    //   const serverAuth = getServerAuth(sessionToken)

    //   await serverAuth.authStateReady()
    //   const user = serverAuth.currentUser

    //   if(!user){
    //     return <section>No User</section>
    //   }

    //   const uid = user.uid
    //   return(
    //     <>asdasd</>
    //   )
    // }catch(error){
    //   console.log(error)
    //   return <section>error</section>
    // }


  // const [appointments, setAppointments] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
    // const auth = getAuth();
    
    // // 🔐 Escuchamos activamente cuando Firebase Auth detecte al usuario en el cliente
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     try {
    //       // 🎯 Le pasamos el UID real y criptográfico del usuario logueado
    //       const data = await AppointmentsFetchData(user.uid);
    //       if (data) setAppointments(data);
    //     } catch (error) {
    //       console.error("Error cargando citas:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   } else {
    //     // Si no está logueado, lo manejas aquí (ej: redirección a /login)
    //     setLoading(false);
    //   }
    // });

    // return () => unsubscribe(); // Limpiamos el listener al desmontar
  // }, []);

  // if (loading) return <div className="p-8 text-center">Cargando tu panel seguro...</div>;
    
}

// return (<main>
//     {/* <section >
//         <h1 className="text-center text-5xl mt-8">Today&apos;s Appointments</h1>
//         <section className='grid gap-6 m-4
//         sm:grid-cold-1 
//         md:grid-cols-2 
//         lg:grid-cols-3 
//         xl:grid-cols-4 
// '>
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
//       {appointments && appointments.length > 0 ? (
//         <ul className="space-y-2">

//           {appointments.map((cardInfo) => (
//             <AppointmentCard key={cardInfo.id} CardInfo={cardInfo} />
//           ))}
//         </ul>
//       ) : (
//         <p>No se encontraron citas escritas en Firestore.</p>
//       )}
//     </div> */}
//             {/* //traer datos reales de Firabase */}
//             {/* <AppointmentCard/> */}
//             {/* <AppointmentCard/> */}
//             {/* <AppointmentCard/> */}
//             {/* {appointments.map((app) => ( */}
//                 {/* <AppointmentCard key={app.id}/> */}
//                 {/* )) */}
//             {/* } */}
//         {/* </section>
//     </section> */}
//     {/* <div>Dashboard</div> */}
//     
//     </main>
//     )

