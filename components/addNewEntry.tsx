import Link from "next/link";

export function AddNewEntry(){
    return <>
        <Link href="/newentry/scanner">
            <div className='bg-navy-accent rounded-full w-12 h-12 flex justify-center items-center fixed bottom-8 right-8 cursor-pointer text-secondary'>
                <ion-icon name="add-outline"></ion-icon>
            </div>
        </Link>
    </>
};