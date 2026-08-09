'use client'
import { ClientData } from "@/types";
import React, { useEffect, useState} from "react";
import { Timestamp } from "firebase/firestore";
import { getCoOwners } from '@/lib/services/users'
export function UserForm () {
    const currentDate = new Date()

    // aplica un lazy load en el estado en tiempo de ejecucion con los datos que vienen del localstorage
        const [clientInfo, setClientInfo] = useState<ClientData>(() => {
        const defaultState: ClientData = {
            id: '',
            ownerId: '',
            ownerInitials: '',
            firstName: '',
            lastName: '',
            notes: '',
            dateCreatedAt: Timestamp.fromDate(currentDate),
            address: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
            email: '',
            birthdate: '',
            anniversary: '',
            significantOtherName: '',
            significantOtherBirthdate: '',
            ringSize: '',
        };

        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('clientData');
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    // localStorage.removeItem('clientData'); // Wipes data immediately and cleanly
                    return { ...defaultState, ...parsedData };
                } catch (e) {
                    console.error("Error parsing localstorage data", e);
                }
            }
        }
        return defaultState;
    });

    const [appointmentDate, setAppointmentDate] = useState(calculateAppointmentDate())

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setAppointmentDate(e.target.value);
    }
    // toma los cambios en los inputs si los llega haber
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setClientInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    
    // maneja el envio del formulario a firebase
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // let clientId = null
        let appointmentData = {}
        // // Handle form submission logic here
        // setUserData(clientInfo)
        // .then((data) => {
            appointmentData = {

                id: '',
                primaryOwnerId: clientInfo.ownerId,
                clientName: clientInfo.firstName,
                clientLastName: clientInfo.lastName,
                notes: clientInfo.notes,
                createdAt: Timestamp.fromDate(currentDate),
                
                date:  appointmentDate, // listo.
                
                clientId: 'data', // listo
                coOwners: [], // lo sacas de la UI, construyes la info. 

                coOwnersMeta: {}, // lo sacas de la UI, construyes la info. 
                leadStatus: 'Hot', // agregar en la UI.. es a mano del usuario.
                saleStatus: 'set_up', // agregar en la UI.. es a mano del usuario.    
            }
        // })
        // console.log(appointmentInfo)

// coOwners: string[]; // array con los usersID de los owners
//     coOwnersMeta: { 
//         [userId: string]:{
//             initials: string;
//         }
//     }
        console.log(appointmentData)
        console.log(clientInfo)

    };

    // call to userData collection and bring info about the user and update the state with data. 
    // const { user } = useAuth()
    // useEffect(()=>{
    //     if(!user) return
    //     UserFetchData(user.uid)
    //     .then((data) => {
    //         setClientInfo((prevData) => ({
    //             ...prevData,
    //             ownerInitials: data?.initials ?? ''
    //         }))
    //     })    
        
    // },[user])

    return<>
        <section>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 

                <article>
                    <h1 className="text-2xl font-bold">Customer Information</h1>
                </article>
                <article className='flex flex-col gap-4'>
                    <label htmlFor="firstName">First Name
                        <input onChange={handleChange} type='text' id='firstName' name='firstName' placeholder="First Name" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.firstName}/>
                    </label>
                    <label htmlFor="lastName">Last Name
                        <input onChange={handleChange} type='text' id='lastName' name='lastName' placeholder="Last Name" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.lastName}/>
                    </label>
                    <label htmlFor="phoneNumber">Phone Number
                        <input onChange={handleChange} type='text' maxLength={10} pattern="[0-9]*"id='phoneNumber' name='phoneNumber' placeholder="Phone Number" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.phoneNumber}/>
                    </label>
                    <label htmlFor="email">Email
                        <input onChange={handleChange} type='email' id='email' name='email' placeholder="Email" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.email}/>
                    </label>
                </article>
                <article>
                    <label htmlFor="notes">Notes
                        <input onChange={handleChange} id='notes' name='notes' placeholder="Notes" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.notes}/>
                    </label>
                </article>
                {/* aqui los datos del appintment, osea decir cuando sera agendado. */}
                <input type="date" defaultValue={appointmentDate} onChange={handleChange2}/>
                <article>
                    Owner
                    <div className='flex gap-4'>
                        <CoOwners/>
                    </div>
                </article>
                <article>
                    <label htmlFor="ringSize">Ring Size
                        <input onChange={handleChange} type='string' maxLength={2} id='ringSize' name='ringSize' placeholder="" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.ringSize}/>
                    </label>
                </article>
                <hr></hr>
                
                <article>
                    <label htmlFor="address">Address
                        <input onChange={handleChange} type='text' id='address' name='address' placeholder="Address" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.address}/>
                    </label>
                    <label htmlFor="city">City
                        <input onChange={handleChange} type='text' id='city' name='city' placeholder="City" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.city}/>
                    </label>
                    <label htmlFor="state">State
                        <input onChange={handleChange} type='text' id='state' name='state' maxLength={2} placeholder="State" className="uppercase border-2 border-black rounded-md p-1" value={clientInfo.state}/>
                    </label>
                    <label htmlFor="zipCode">Zip Code
                        <input onChange={handleChange} type='text' id='zipCode' name='zipCode' placeholder="Zip Code" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.zipCode}/>
                    </label>
                </article>
                <hr></hr>
                <article>
                    <label htmlFor="birthdate">Birthdate
                        <input onChange={handleChange} type='text' id='birthdate' name='birthdate' placeholder="Birthdate" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.birthdate}/>
                    </label>
                    <label htmlFor="anniversary">Anniversary
                        <input onChange={handleChange} type='text' id='anniversary' name='anniversary' placeholder="Anniversary" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.anniversary} />
                    </label>
                    <label htmlFor="significantOtherName">Significant Other Name
                        <input onChange={handleChange} type='text' id='significantOtherName' name='significantOtherName' placeholder="Significant Other Name" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.significantOtherName}/>
                    </label>
                    <label htmlFor="significantOtherBirthdate">Significant Other Birthdate
                        <input onChange={handleChange} type='text' id='significantOtherBirthdate' name='significantOtherBirthdate' placeholder="Significant Other Birthdate" className="border-2 border-black rounded-md p-1 clientDataInfo" value={clientInfo.significantOtherBirthdate} />
                    </label>
                </article>
                <button>Sent</button>

            </form>
        </section>

    </>
}
// calcula si la fecha es ta vacia, o si es del pasado. al cumplirse escoge 7 dias al futuro desde el dia de hoy.
// de no se el caso contrario, escoge la fecha seleccionada desde el localStorage
const calculateAppointmentDate = () =>{
    if(typeof window !== 'undefined'){
        const w = localStorage.getItem('appointmentData')
        if(w){

            const timestamp = JSON.parse(w); // parsea el string a objeto
            const todayDate = new Date(); // obtiene el dia de hoy
            todayDate.setDate(todayDate.getDate() + 7) 
            const todayDateFormat_yyyyMMdd = todayDate.toLocaleDateString('en-CA'); //  
            if(timestamp.nanoseconds == null){
                return todayDateFormat_yyyyMMdd
            }
            const dateString = new Date(timestamp.seconds * 1000).toISOString().split('T')[0];
            return dateString < todayDateFormat_yyyyMMdd ? todayDateFormat_yyyyMMdd : dateString
            
        }
    }
}

// pedir datos de id y asi calcuar los datospara el appointment. como el coOwnersMeta
// --------
// Entonces el resumen final es:
// De la foto (prellenado, editable):
// clientName, clientLastName, notes, date 
// email, phoneNumber, address, city, state, zipCode, birthdate, anniversary, significantOtherName, significantOtherBirthdate, ringSize
// owners
// (si existe en la foto)
// El usuario selecciona en el formulario:
// leadStatus, saleStatus,
// Se calculan al submit:

// id, primaryOwnerId, coOwners, coOwnersMeta, clientId, createdAt
// date si no vino en la foto → hoy + 7 días

// Con eso claro, tienes dos estados separados en el formulario: 
// uno para ClientData y otro para AppointmentData. Al hacer submit escribes en ambas colecciones, y el clientId del appointment es el id que retorna Firestore al crear el cliente.

function CoOwners () {
    // traemos los datos del localStorage
    // y chequeamos que info hay en la base de datos que coincidan con estas iniciales en /userData
    // traemos todo lo que sea igual. 
    // si hay 2 duplicados, decirle al usuario del conflicto y que el decida quien agregar
    // para esto, se le debe mostrar ambos nombres. 
    // de lo que el usuario decida, es el que quedara activo y listo para agregarse a appointmentData
    const [initials, setInitiasl ] = useState('')
    useEffect(() => {
        if(typeof window !== 'undefined'){
        const q = localStorage.getItem('coOwners')
            if(q){
                const w = JSON.parse(q)
                // setInitiasl(w)
                console.log(w)
                
                getCoOwners(w)
                .then(data => {
                    console.log(data)
                })
            }
    }
    }, [])

    return <>
    <div className='flex gap-4'>
                        <div>
                            <span>SP</span>
                        </div>
                        <div>
                            <span>WT</span>
                        </div>
                        <div>
                            <span>AH</span>
                        </div>
                    </div>
    </>
}
