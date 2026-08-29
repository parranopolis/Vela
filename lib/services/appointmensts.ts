import { AppointmentData } from '@/types';
import { db } from '../firebase/config'
import { collection, addDoc, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore'
/**
 * Bring Information from the Appointments collection in firebase
 * it decide whats the leadStatus on the appointment and build the query base on what the user needs to see
 * the parameter are the followings. 
 * toda's Date -> todayDate+set_up
 * pending Calls  -> todayDate+pending_callback
 * never called -> date < todayDate + pending callback.
 * @param userId 
 * @param saleStatus 
 * @returns all the info that match the query.
 */

export async function AppointmentFetchData(userId: string, saleStatus:string) {

    const startOfToday = new Date()
    startOfToday.setHours(0,0,0,0)

    const endOfToday = new Date()
    endOfToday.setHours(23,59,59,999)
    
    try{
        const appointmentsRef = collection(db, 'appointments')
        // this brings the info for set_up and pending_callbacks
        const today = query(
            appointmentsRef,
            where('coOwners', 'array-contains', userId),
            where('saleStatus', '==', saleStatus),
            where('date', '>=', Timestamp.fromDate(startOfToday)),
            where('date', '<=', Timestamp.fromDate(endOfToday)),
        )
        // this brings the info for follow_up
        const follow_up = query(
            appointmentsRef,
            where('coOwners', 'array-contains', userId),
            where('saleStatus', 'in', ['set_up', 'pending_callback']),
            where('date', '<', Timestamp.fromDate(startOfToday)),
            orderBy('date'),
        )
        const upcoming = query(
            appointmentsRef,
            where('date', '>=', Timestamp.fromDate(endOfToday)),
            where('coOwners', 'array-contains', userId),
            where('saleStatus', '==', 'set_up'),
            orderBy('date'),
        )
        let activeQuery

        if (saleStatus === 'follow_up') {
            activeQuery = follow_up
        } else if (saleStatus === 'upcoming') {
            activeQuery = upcoming
        } else {
            activeQuery = today
        }
        console.log(activeQuery)
        const querySnapshot = await getDocs(activeQuery)

        const items = querySnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))    
        return items as AppointmentData[]
 }catch (error) {
    console.error("Error fetching user appointments:", error);
  }
} 

/**
 * write data in appointments collection in firebase.
 * @param 
 */
export async function setUpAppointment(objAppointmentData : object) {
   try{
    const collRef = await addDoc(collection(db, 'appointments'), objAppointmentData)
    return collRef.id
   } catch(error){
    console.log(error)
   }
}