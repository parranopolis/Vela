'use client'
import { useAuth } from "@/lib/firebase/auth-context";
import { Timestamp } from "firebase/firestore";
import { UserFetchData } from '@/lib/services/users'
import { useRouter } from "next/navigation";
import {useState} from 'react'
import { LoadingSpinner } from "@/components/loading";
export default function Scanner (){

    const { user } = useAuth()
    const route = useRouter()
    const [isLoading, setIsloading] = useState(false)

    const  test = async (e: React.ChangeEvent<HTMLInputElement> )=> {
        deleteLocalStorage()
        if(e.target.files && e.target.files[0]){
            setIsloading(true)
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
           
                UserFetchData(user.uid)
                .then(data => {
                    if(!data) return
                    const clietnObj = {
                        ...parsed,
                        ownerId : data.userId,
                        ownerInitials: data?.initials,
                        dateCreatedAt: Timestamp.fromDate(new Date()),
                        id: ''
                    }
                    const coOwners = parsed.coOwners 
                    // const coOwners = ['SP','MK','JA']
                    createLocalStorageInfo(clietnObj,coOwners)
                    route.push('/newentry/reviewform')
                    setIsloading(false)
                })
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
            <h2 className="text-2xl">{isLoading? 'Analyzing your Image' :"Open the scanner"}</h2>
            {isLoading ? <LoadingSpinner/> : <div>
                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Take the Picture</label>
                <input 
                    id="photo" 
                    type="file" 
                    accept="image/*"
                    capture="environment"
                    onChange={test}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>}
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

const createLocalStorageInfo = (client: object, coOwners: Array<string> ) => {
    localStorage.clear()
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);


    const timestamp = Timestamp.fromDate(targetDate);

    localStorage.setItem('clientData', JSON.stringify(client))
    localStorage.setItem('appointmentDate', JSON.stringify(timestamp))
    // escanamos la foto y sacamos las iniciales de los coOwnwes. ponemos todo en texto, no importa que hay
    localStorage.setItem('coOwners', JSON.stringify(coOwners))  // mostrar todos y que el usuario decida. 
    console.log(localStorage)
}
