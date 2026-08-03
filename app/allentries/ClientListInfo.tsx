'use client'
import { useAuth } from "@/lib/firebase/auth-context";
import { useEffect, useState } from "react";
import { ClientData } from "../types";
import { clientsListFetchCard } from "@/lib/services/clients";

export function ClientListInfo (){
    const { user } = useAuth()

    const [clients, setClients] = useState<ClientData[]>([])
    
    useEffect(() => {
        if(!user) return
        clientsListFetchCard()
        .then((data) => {
            if(data) setClients(data.clientData)
        });
    },[user])
    return<>
        <section className="my-4 mx-4">
            <h1 className="text-3xl pb-4">All Clients</h1>
            {/* filters goes here */}
                {clients && clients.length > 0 ? (
                    <ul className="space-y-2">
                        {clients.map((cardInfo) =>(<ClientCard data={cardInfo} key={cardInfo.id}/>))}
                    </ul>
                ): "No hay Datos"}
        </section>
    </>

}

function ClientCard ({data} : { data: ClientData }){
    return <>
        <article className="flex justify-center gap-8 items-center my-4">
            <div className="flex flex-col bg-secondary rounded-2xl py-2 px-6 justify-items-start w-full">
                <span className="text-xl">{data.name} {data.lastName}</span>
                <span className="text-sm text-text-secondary italic font-extralight">{data.phone}</span>
                <span className="text-sm italic">{data?.email}</span>
            </div>
            <div className="bg-dark-accent text-secondary rounded-full p-4">
                <span className="text-lg">{data.ownerInitials}</span>
            </div>
        </article>
    </>
}

