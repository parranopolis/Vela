import { AddNewEntry } from "@/components/addNewEntry";
import { NavBar } from "@/components/bar";
import { AuthGate } from "./AuthGate";

export default function GroupOneLayout({children,}: Readonly<{children: React.ReactNode;}>){
    return <>
        <AuthGate>
        <NavBar/>
            {children}
        <AddNewEntry/>
        </AuthGate>
    </>

}