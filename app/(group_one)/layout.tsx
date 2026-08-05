import { AddNewEntry } from "@/components/addNewEntry";
import { NavBar } from "@/components/bar";
export default function GroupOneLayout({children,}: Readonly<{children: React.ReactNode;}>){
    return <>
        <NavBar/>
        {children}
        <AddNewEntry/>
    </>

}