// funcion para traer todos los datos de Firebase
import { AppointmentData, ClientData } from '@/app/types';
import { db } from '../firebase/config'
import { collection, query, where, getDocs, Timestamp, doc, getDoc, orderBy } from 'firebase/firestore'

export async function AppointmentsFetchData(userId: string) {

    const startOfToday = new Date()
    startOfToday.setHours(0,0,0,0)

    const endOfToday = new Date()
    endOfToday.setHours(23,59,59,999)

    try{
        const appointmentsRef = collection(db, 'appointments')
        const q = query(
            appointmentsRef,
            where('coOwners', 'array-contains', userId),
            where('date', '>=', Timestamp.fromDate(startOfToday)),
            where('date', '<=', Timestamp.fromDate(endOfToday)),
            orderBy('date')
        )

        const querySnapshot = await getDocs(q)

        // const docRef2 = await getDocs(collection(db, 'appointments'))
        const items = querySnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))    
        return items as AppointmentData[]
 }catch (error) {
    console.error("Error fetching user appointments:", error);
  }
} 

export async function clientFetchData(clientId: string){
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