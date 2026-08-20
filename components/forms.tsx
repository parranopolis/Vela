'use client'
import { ClientData, UserData } from "@/types";
import React, { useEffect, useState} from "react";
import { Timestamp } from "firebase/firestore";
import { getCoOwners } from '@/lib/services/users'
import { setUserData } from '@/lib/services/clients'
import { setUpAppointment } from "@/lib/services/appointmensts";
import { useAuth } from "@/lib/firebase/auth-context";

/**
* Form component for new entries; retrieves data from localStorage (configured in /scanner)
* Prepares objects with the appropriate structures for submission to Firebase
* Data includes information from inputs, divs, arrays, select elements, among others
* Calculates dates and document co-owners.
* @returns component
 */
export function UserForm () {
    const currentDate = new Date()
    const { user } = useAuth()
    // Implement lazy loading for the state at runtime using data from localStorage.
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
                    return { ...defaultState, ...parsedData };
                } catch (e) {
                    console.error("Error parsing localstorage data", e);
                }
            }
        }
        return defaultState;
    });

    const [appointmentDate, setAppointmentDate] = useState(calculateAppointmentDate())
    const [leadStatus, setLeadStatus ] = useState('Hot')


    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setAppointmentDate(e.target.value);
    }
    // captures changes in the inputs, if any
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setClientInfo((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    // handles form submission to Firebase
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q = JSON.parse(localStorage.getItem('coOwnersSelected') || '[]')
        const coOwners:string[] = [] // contains the id of all owners on this document
        let coOwnersMeta = {} // contains the structure ready to sent to firestore
        for (const {userId, initials} of q) {
            coOwners.push(userId)
            coOwnersMeta = {
                ...coOwnersMeta,
                [userId] : {
                    "initials": initials
                }
            }
        }
        
        let appointmentData = {}
        if(user?.uid){
            if(coOwners.includes(user.uid)){
                if(coOwners.length >=2 && coOwners.length <= 3){
                
                // // Handle form submission logic here
                        setUserData(clientInfo)
                    .then((data) => {
                        // console.log(data)
                    const q: Date = new Date(`${appointmentDate}T00:00:00Z`)

                    appointmentData = {
                        id: data,
                        primaryOwnerId: clientInfo.ownerId,
                        clientName: clientInfo.firstName,
                        clientLastName: clientInfo.lastName,
                        notes: clientInfo.notes,
                        createdAt: Timestamp.fromDate(currentDate),
                        date:  Timestamp.fromDate(q),
                        clientId: data, 
                        coOwners: coOwners,
                        coOwnersMeta: coOwnersMeta, 
                        leadStatus: leadStatus,
                        saleStatus: 'set_up',
                    }
                // console.log(appointmentData)
                    setUpAppointment(appointmentData)
                    .then((data) => {
                        console.log(data)
                    })
                })
                }else{
                    alert("Check your TO's rules")
                }
            }else{
                alert("Add yourselft as a Owner")
            }

        }
    };

    const handleLeadStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLeadStatus(e.target.value)
    }
      useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
        };
        
        localStorage.removeItem('coOwnersSelected'); // Wipes data immediately and cleanly
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        };
  }, []);

    return<>
        <section>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 
                <article>
                    <h1 className="text-2xl font-bold">Customer Information</h1>
                </article>
                <article>
                    <label htmlFor="leadStatus">Select Lead Status</label>
                    <select id="leadStatus" name='leadStatus' value={leadStatus} onChange={handleLeadStatus}>
                        <option value="Hot">Hot</option>
                        <option value="Warm">Warm</option>
                        <option value="Cold">Cold</option>
                    </select>
                </article>
                <article className='flex flex-col gap-4'>
                    <label htmlFor="firstName">First Name
                        <input onChange={handleChange} type='text' id='firstName' name='firstName' placeholder="First Name" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.firstName}/>
                    </label>
                    <label htmlFor="lastName">Last Name
                        <input onChange={handleChange} type='text' id='lastName' name='lastName' placeholder="Last Name" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.lastName}/>
                    </label>
                    <label htmlFor="phoneNumber">Phone Number
                        <input onChange={handleChange} type='text' maxLength={14} id='phoneNumber' name='phoneNumber' placeholder="Phone Number" className="border-2 border-black rounded-md p-1 clientDataInfo" required value={clientInfo.phoneNumber}/>
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
                <input type="date" id='date' defaultValue={appointmentDate} onChange={handleChange2}/>
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
/**
* Determines if the date is empty or in the past; if so, selects a date 7 days from today. 
* Otherwise, retrieves the selected date from localStorage.
* @returns A string in YYYY-MM-DD format representing the chosen date.
*/

const calculateAppointmentDate = () =>{
    if(typeof window !== 'undefined'){
        const w = localStorage.getItem('appointmentDate')
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

/**
*
* Handles changes to co-owners, manages duplicates and display formatting,
* and prepares everything to construct the final object for submission to Firestore. 
* @returns A component containing the users to be displayed. 
*/

function CoOwners () {
    const [initials, setInitiasl ] = useState<UserData[]>([])
    const [duplicates, setDupliates ] = useState(false)
    const [readyToSent, setReadyToSent] = useState<UserData[]>([])
    const [test, setTest ] = useState<string[]>([])

    useEffect(() => {
        if(typeof window !== 'undefined'){
        const q = localStorage.getItem('coOwners')
        
            if(q){
                const w = JSON.parse(q)
                const filtered = w.filter((item:string) => item !== null && item !== undefined)
                getCoOwners(filtered)
                .then(data => {
                    if(data){
                        setInitiasl(data)
                        if(filtered.length != data.length)setDupliates(true)
                    }
                })
            }
    }
    }, [])

    const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const elementId = e.currentTarget.id; 
        
        const innerCircle = e.currentTarget.firstElementChild as HTMLElement;
        
        if (!innerCircle) return; // Safety check

        const isAlreadySelected = innerCircle.classList.contains('bg-navy-accent');

        if (test.length < 3 || isAlreadySelected) {
            
            innerCircle.classList.toggle('bg-navy-accent');
            innerCircle.classList.toggle('bg-third-light');
            innerCircle.classList.toggle('text-white');

            if (!isAlreadySelected) {
                setTest((prev) => [...prev, elementId]);
                initials.find(u => {
                    if(u.userId == elementId){
                        const newReadyToSent = [...readyToSent, u]
                        setReadyToSent(newReadyToSent)
                        localStorage.setItem('coOwnersSelected', JSON.stringify(newReadyToSent))
                    }

                })
            } else {
                setTest((prev) => prev.filter(id => id !== elementId));
                readyToSent.find(u => {
                    if(u.userId == elementId){
                        const newReadyToSent = readyToSent.filter(n => n !== u)
                        setReadyToSent(newReadyToSent)
                        localStorage.setItem('coOwnersSelected', JSON.stringify(newReadyToSent))
                    }
                    
                })
            }
        }

    };

    return initials.map((w) => {
        return (
            <div key={w.userId} id={w.userId} onClick={(e) => handleChange(e)}>
                <div className={`border flex w-14 justify-center rounded-full p-4 bg-third-light`}>
                    {w.initials}
                </div>
                {duplicates === false ? '' : (<>
                    <div>{w.firstName}</div>
                    <div>{w.lastName}</div>
                </>
                )
                }
            </div>
            
        )
    })
}