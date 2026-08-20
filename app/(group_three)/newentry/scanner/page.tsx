'use client'
import { useAuth } from "@/lib/firebase/auth-context";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { UserFetchData } from '@/lib/services/users'
export default function Scanner (){



    const { user } = useAuth()
 

    // useEffect(() => {
    //     if(!user) return
    //     let clienteInformationScannerRetriveData ={}
    //     UserFetchData(user.uid)
    //     .then((data) => {
    //         clienteInformationScannerRetriveData = {
    //             id: '',
    //             ownerId: user?.uid,
    //             ownerInitials: data?.initials,
    //             firstName: 'Josefina',
    //             lastName: 'Royal',
    //             notes: 'like some necklaces with matchign earrings',    
    //             dateCreatedAt: Timestamp.fromDate(new Date()),
    //             address: '2261 S Buckly rd',
    //             city: 'aurora',
    //             state: 'CO',
    //             zipCode: '80013',
    //             phoneNumber: '23123123123',
    //             email: 'royal.j25@gmail.com',
    //             birthdate: '09/29/1989',
    //             anniversary: '',
    //             significantOtherName: '',
    //             significantOtherBirthdate: '',
    //             ringSize: '',
    //         }
    //         createLocalStorageInfo()
    //     })    
     
        
    //     
    // },[user])
    

// Usuario sube foto en /newentry/scanner.  --------------
// La foto va a una API route de Next.js /api/extract-client -----
// La API route llama a Gemini con la foto y un prompt ------
// Gemini retorna los datos estructurados ------
// Los datos se guardan en localStorage ---
// El usuario es redirigido a /newentry/reviewform con los campos prellenados


    const  test = async (e: React.ChangeEvent<HTMLInputElement> )=> {
        
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]
            try{
                if(!user) return
                const base64 = await convertToBase64(image)
                const response = await fetch('/api/extract-client', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({base64})
                })
                const data = await response.json()
                const cleaned = data.data.replace(/```json\n|```/g, '').trim()
                const parsed = JSON.parse(cleaned)
                
                // const clienteInformationScannerRetriveData = { // respuesta del post simulada para no gastar tokens, 
                // // es la simulacion de lo que muestra parsed
                // // la info actual es de la foto IMG_3644.jpeg
                //     address : "19014 Burlington Pl",
                //     anniversary :  "September",
                //     birthdate :  "6/18/99",
                //     city :  "Denver",
                //     email :  "madisonduke94@gmail.com",
                //     firstName :  "Madison",
                //     lastName :  "Duke",
                //     notes :  "enhancer, sku number/item: 6817591, 2623056 (favorite), 6809439, 2532348, special order/repair instructions: 6817741 (His favorite.), 2522654.",
                //     phoneNumber : "(303) 506 8606",
                //     ringSize : "Band 4.5 Her.",
                //     significantOtherBirthdate : "11/1/91",
                //     significantOtherName : "Antony Mburu",
                //     state : "CO",
                //     zipCode : "80249",
                // }
                UserFetchData(user.uid)
                .then(data => {
                    if(!data) return
                    const finalObj = {
                        ...parsed,
                        ownerId : data.userId,
                        ownerInitials: data?.initials,
                        dateCreatedAt: Timestamp.fromDate(new Date()),
                        id: ''
                    }
                    
                    console.log(finalObj)
                    
                    createLocalStorageInfo(finalObj)
                })
                // console.log(parsed)
            }catch(error){
                console.log(error)
            }
        }

    }

    const deleteLocalStorage = () =>{
        console.log(localStorage)
        localStorage.clear()
        console.log(localStorage)
    }
    return <>
        <section>
            <Link href='/newentry/reviewform'>next view</Link>
        </section>
        <section>
            camera view feature
            <input type="file" accept="image/*" capture="environment" id="photo" onChange={test} />
            {/* <Image></Image> */}
            <div onClick={deleteLocalStorage}>borrar</div>
        </section>

    </>
}

function convertToBase64(image: File): Promise<string | ArrayBuffer | null>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(image)

        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

const createLocalStorageInfo = (obj: object) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);


    const timestamp = Timestamp.fromDate(targetDate);

    localStorage.setItem('clientData', JSON.stringify(obj))
    localStorage.setItem('appointmentDate', JSON.stringify(timestamp))
    // escanamos la foto y sacamos las iniciales de los coOwnwes. ponemos todo en texto, no importa que hay
    // localStorage.setItem('coOwners', JSON.stringify(['SP','VC','JA']))  // mostrar todos y que el usuario decida. 
}
