import { ClientData } from '@/types'
import { db } from '@/lib/firebase/config'
import { query, addDoc, collection, getDocs, orderBy, limit, startAfter, DocumentSnapshot } from 'firebase/firestore'

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
    //   const q = await setDoc(doc(db, 'clients'), obj)
      return `document sent ${collRef.id}`
    }catch(error){
      return error
    }
}