import { collection, doc, getDoc, getDocs, query, where, setDoc} from 'firebase/firestore'
import { NextResponse } from 'next/server';
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

export async function getAllUserData(): Promise<UserData[] | null> {
    try{
        
        const querySnapshot = await getDocs(collection(db, 'userData'))

        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        return users as unknown as UserData[]
    }catch(error){
        console.log(error)
        return null
    }

}

export async function createNewUser(obj:UserData): Promise<UserData | null> {
    const documentId = obj.userId // gets the user ID form auth/firebase autentication
    try {
        const docRef = doc(db, "userData", documentId) // create a custom document id with the previous user id
        await setDoc(docRef, obj) // save the document
        return obj
    } catch (error) {
        console.error("Error writing document to Firestore: ", error)
        return null
  }
}


