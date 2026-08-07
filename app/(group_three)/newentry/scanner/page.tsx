'use client'
import { useAuth } from "@/lib/firebase/auth-context";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Scanner (){



    const { user } = useAuth()
 

    useEffect(() => {
           const q ={
        id: '',
        ownerId: user?.uid,
        ownerInitials:'', // pending
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
        const w = () => {
            localStorage.setItem('clientData', JSON.stringify(q))
        }
        w()
    },[user?.uid])
    
    return <>
        <section>
            <Link href='/newentry/reviewform'>next view</Link>
        </section>
        <section>
            camera view feature
        </section>

    </>
}