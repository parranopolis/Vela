'use client'
import { useAuth } from "@/lib/firebase/auth-context";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { UserFetchData } from '@/lib/services/users'
import { useState, useEffect } from "react";
export default function Scanner (){



    const { user } = useAuth()
 

    useEffect(() => {
        if(!user) return
        let clienteInformationScannerRetriveData ={}
        UserFetchData(user.uid)
        .then((data) => {
                clienteInformationScannerRetriveData = {
                id: '',
                ownerId: user?.uid,
                ownerInitials: data?.initials,
                firstName: 'Maria',
                lastName: 'Pineda',
                notes: 'este es un usuario creado desde la UI',    
                dateCreatedAt: Timestamp.fromDate(new Date()),
                address: '00000 Street',
                city: 'Sacrament',
                state: 'TX',
                zipCode: '22200',
                phoneNumber: '99928882828',
                email: 'test2@gmail.com',
                birthdate: '12/14/1999',
                anniversary: '06/15/2020',
                significantOtherName: 'Marcos Parra',
                significantOtherBirthdate: '',
                ringSize: '4',
            }
            createLocalStorageInfo()
        })    
     
        
        
        const createLocalStorageInfo = () => {
            const date = Timestamp.fromDate(new Date('2027-02-29'))
            
            localStorage.setItem('clientData', JSON.stringify(clienteInformationScannerRetriveData))
            localStorage.setItem('appointmentData', JSON.stringify(date))
            // escanamos la foto y sacamos las iniciales de los coOwnwes. ponemos todo en texto, no importa que hay
            localStorage.setItem('coOwners', JSON.stringify(['JT',"JA",'VC']))   
        }
    },[user])
    
    return <>
        <section>
            <Link href='/newentry/reviewform'>next view</Link>
        </section>
        <section>
            camera view feature
        </section>

    </>
}