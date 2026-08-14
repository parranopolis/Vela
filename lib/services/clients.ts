import { ClientData } from '@/types'
import { db } from '@/lib/firebase/config'
import { query, addDoc, collection, getDocs, orderBy, limit, startAfter, DocumentSnapshot, doc, getDoc } from 'firebase/firestore'

export async function clientsListFetchCard(lastDoc?:DocumentSnapshot): Promise<{
    clientData: ClientData[]
    lastDoc: DocumentSnapshot | null;
}> {
    const q = lastDoc
    ? query(collection(db, 'clients'), orderBy('lastName'), startAfter(lastDoc), limit(10))
    : query(collection(db, 'clients'), orderBy('lastName'), limit(10))
    
  const snapshot = await getDocs(q)
  return { 
    clientData: snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ClientData[],
    lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null
    }
}

export async function setUserData(obj : object) {
  try{
    const collRef = await addDoc(collection(db, 'clients'), obj)  
      return collRef.id
    }catch(error){
      return error
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