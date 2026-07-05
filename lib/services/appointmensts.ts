// funcion para traer todos los datos de Firebase
import { AppointmentData } from '@/app/types';
import { db } from '../firebase/config'
import { collection, query, where, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore'

export async function AppointmentsFetchData(userId: string) {

    const startOfToday = new Date()
    startOfToday.setHours(0,0,0,0)

    const endOfToday = new Date()
    endOfToday.setHours(23,59,59,999)

    try{
        const appointmentsRef = collection(db, 'appointments')
        const q = query(
            appointmentsRef,
            where('coOwners', 'array-contains', userId)
        )

        const querySnapshot = await getDocs(q)

        // const docRef2 = await getDocs(collection(db, 'appointments'))
        const items = querySnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))    
        return items 
 }catch (error) {
    console.error("Error fetching user appointments:", error);
  }
} 