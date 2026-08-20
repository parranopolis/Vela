import { collection, doc, getDoc, getDocs, query, where} from 'firebase/firestore'

// import { collection, DocumentSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { UserData } from '@/types';

export async function UserFetchData (id : string): Promise<UserData | null>{
    try {
        // Apuntamos directamente al documento usando el ID del usuario
        const docRef = doc(db, 'userData', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as unknown as UserData ;
        } else {
            console.log("No se encontró el documento del usuario!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export async function getCoOwners(arr : Array<string>): Promise<UserData[]> {
    console.log(arr)
    try{
        const coOwnerRef = collection(db, 'userData')
        const coOwners = query(
            coOwnerRef,
            where('initials','in',arr)
        )
        const querySnapshot = await getDocs(coOwners)

        const items = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
       }))
        return items as unknown as UserData[]
    }catch(error){
        console.log(error)
        return []
    }

}


