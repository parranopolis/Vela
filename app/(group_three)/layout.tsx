import { NavBar } from "@/components/bar";
export default function GroupThreeLayout({children,}: Readonly<{children: React.ReactNode;}>){
    return <>
        <NavBar/>
        {children}
    </>

}