import { doc, getDoc} from 'firebase/firestore'

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


