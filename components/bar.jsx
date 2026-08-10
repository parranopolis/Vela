import Link from "next/link";
import Image from "next/image"
import ButtonSignOut from "@/app/(group_one)/dashboard/buttonSignOut";

export function NavBar () {
    return <>
        <nav className="flex justify-between bg-navy-accent text-secondary w-full px-8 h-16 items-center">
            <section>
                <Image src={'/logo.png'} width={50}
                height={50}
                alt="Picture of the author"/>
            </section>
            <section className="flex gap-4">
                <Link href={'/dashboard'}><span><ion-icon name="home-outline"></ion-icon></span></Link>
                <Link href={'/allentries'}><span><ion-icon name="person-outline"></ion-icon></span></Link>
                <span><ButtonSignOut icon={<ion-icon name="log-out-outline"></ion-icon>}/></span>
            </section>
        </nav>
        
    </>
}