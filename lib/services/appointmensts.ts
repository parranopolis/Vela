// funcion para traer todos los datos de Firebase
import { AppointmentData, ClientData } from '@/types';
import { db } from '../firebase/config'
import { collection, query, where, getDocs, Timestamp, doc, getDoc, orderBy } from 'firebase/firestore'

export async function AppointmentFetchData(userId: string, saleStatus:string) {

// decidir que parametros hay que llamar

// lo de hoy que seria -> todayDate+set_up
// llamadas pendientes que seria -> todayDate+pending_callback
// y lo que nunca se llamo -> date < todayDate + pending callback.

    const startOfToday = new Date()
    startOfToday.setHours(0,0,0,0)

    const endOfToday = new Date()
    endOfToday.setHours(23,59,59,999)
    
    try{
        const appointmentsRef = collection(db, 'appointments')
        // this works perfect for set_up and pending_callbacks
        const today = query(
            appointmentsRef,
            where('coOwners', 'array-contains', userId),
            where('saleStatus', '==', saleStatus),
            where('date', '>=', Timestamp.fromDate(startOfToday)),
            where('date', '<=', Timestamp.fromDate(endOfToday)),
            orderBy('date'),
        )


        // arrays-contains no se puede usar en la misma query del not-in.. piensa como separarlo 
        // chequea el status de follow up. no importa, este es solo para fechas vencidads que no son sale_closed o discarted. 
        const follow_up = query(
            appointmentsRef,
            where('coOwners', 'array-contains', userId),
            where('saleStatus', 'in', ['set_up', 'pending_callback']),
            where('date', '<', Timestamp.fromDate(startOfToday)),
            // where('date', '<=', Timestamp.fromDate(endOfToday)),
            orderBy('date'),
        )

        // const querySnapshot = await getDocs(q)
        // const querySnapshot = await getDocs(follow_up)
        const querySnapshot = saleStatus === 'follow_up' 
            ? await getDocs(follow_up)
            : await getDocs(today)

        const items = querySnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))    
        return items as AppointmentData[]
 }catch (error) {
    console.error("Error fetching user appointments:", error);
  }
} 

export async function clientFetchData(clientId: string){ // move to clients.ts
    try{
        const docRef = doc(db, 'clients', clientId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as ClientData
        }else{
            console.log("No such document!")
            return null;
        }
    } catch (error) {
        console.error("Error fetching client data:", error);
        return null;
    }
}