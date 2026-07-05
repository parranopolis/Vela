// funcion para traer todos los datos de Firebase
import { AppointmentData } from '@/app/types';
import { db } from '../firebase/config'
import { collection, query, where, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore'

export async function AppointmentsFetchData() {

    const startOfToday = new Date()
    startOfToday.setHours(0,0,0,0)

    const endOfToday = new Date()
    endOfToday.setHours(23,59,59,999)

    try{
        const docRef2 = await getDocs(collection(db, 'appointments'))
        const item = docRef2.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))    
        console.log('2')
        console.log(item)
        return item 
 }catch (error) {
    console.error("Error fetching user appointments:", error);
  }
} 

    // const appointmentSnap = await getDoc(appointmentsRef)

    // if(appointmentSnap.exists()) {
    //     console.log(appointmentSnap.data())
    // }

// RLLlBSWjG0RVKKBhD2GH
    // const q = query(
        // collection(db, 'appointments')
        // where('date', '>=', Timestamp.fromDate(startOfToday)),
        // where('date', '<=', Timestamp.fromDate(endOfToday))
    // )
    
    // const querySnapShot = await getDocs(q)
    // console.log(querySnapShot)
    // return querySnapShot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data()
    // })) as AppointmentData[]
// }