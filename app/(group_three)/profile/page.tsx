'use client'
import { LoadingSpinner } from "@/components/loading";
import { useAuth } from "@/lib/firebase/auth-context";
import { createNewUser } from "@/lib/services/users";
import { UserData } from "@/types";
import {useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile (){
    const { user, setProfileComplete } = useAuth()
    const [isloading, setIsLoading ] = useState(false)
    const [profileInfo, setProfileInfo ] = useState<UserData>({
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        associateNumber: '',
        initials: '',    
    })
    
    const router = useRouter()

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfileInfo((prevData) => {
        let newValue = value

        // Capitalizar primera letra de nombre y apellido
        if (name === 'firstName' || name === 'lastName') {
            newValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        }

        // Solo números para phoneNumber (max 10) y associateNumber (max 4)
        if (name === 'phoneNumber') {
            newValue = value.replace(/\D/g, '').slice(0, 10)
        }
        if (name === 'associateNumber') {
            newValue = value.replace(/\D/g, '').slice(0, 4)
        }

        const newData = {
            ...prevData,
            [name]: String(newValue)
        }

        // Calcular iniciales automáticamente cuando cambie nombre o apellido
        if (name === 'firstName' || name === 'lastName') {
            const first = name === 'firstName' ? newValue : prevData.firstName
            const last = name === 'lastName' ? newValue : prevData.lastName
            newData.initials = (first.charAt(0) + last.charAt(0)).toUpperCase()
        }

        return newData
    })
}
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(true)
        if (user) {
            const updatedProfile = {
                ...profileInfo,
                userId: user.uid
            }
            createNewUser(updatedProfile)
            .then(data => {
                if(data && data != null){
                    alert('User successfully created')
                    setIsLoading(false)
                    setProfileComplete(true)
                }
            })    
        }else {
            alert('An error occurred; please try again later.')
            setIsLoading(false)
            router.push('/login')
        }
    }
    return <>
    {/* <NavBar/> */}
   {isloading ? <LoadingSpinner/> :  <section className="p-4">
    <h2 className="text-2xl">Welcome to Vela</h2>
    <h3 className="text-xl">Before we continue, Lets finish your profile.</h3>
    <form action="" className="flex flex-col gap-2 " onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" className="border-2 border-black rounded-md p-1" onChange={handleChange} required/>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id='lastName' name="lastName" className="border-2 border-black rounded-md p-1" onChange={handleChange} required/>
        <label htmlFor="">email</label>
        <input type="email" id="email" name="email" className="border-2 border-black rounded-md p-1" onChange={handleChange} required/>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" pattern="[0-9]*"  id="phoneNumber" name="phoneNumber" maxLength={10} className="border-2 border-black rounded-md p-1" onChange={handleChange} placeholder="Example: 7202223311" required/>
        <label htmlFor="associateNumber">Associate Code</label>
        <input type="tel" pattern="[0-9]*" id="associateNumber" name="associateNumber" maxLength={6} className="border-2 border-black rounded-md p-1" onChange={handleChange} required/>
        <button>Create Your Profile</button>
    </form>
    </section>}
    </>
}