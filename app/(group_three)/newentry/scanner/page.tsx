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
                firstName: 'Josefina',
                lastName: 'Royal',
                notes: 'like some necklaces with matchign earrings',    
                dateCreatedAt: Timestamp.fromDate(new Date()),
                address: '2261 S Buckly rd',
                city: 'aurora',
                state: 'CO',
                zipCode: '80013',
                phoneNumber: '23123123123',
                email: 'royal.j25@gmail.com',
                birthdate: '09/29/1989',
                anniversary: '',
                significantOtherName: '',
                significantOtherBirthdate: '',
                ringSize: '',
            }
            createLocalStorageInfo()
        })    
     
        
        const createLocalStorageInfo = () => {
            const date = Timestamp.fromDate(new Date('2027-02-29'))

            localStorage.setItem('clientData', JSON.stringify(clienteInformationScannerRetriveData))
            localStorage.setItem('appointmentData', JSON.stringify(date))
            // escanamos la foto y sacamos las iniciales de los coOwnwes. ponemos todo en texto, no importa que hay
            localStorage.setItem('coOwners', JSON.stringify(['SP','JT','JA'])) 
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