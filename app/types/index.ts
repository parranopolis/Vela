import { Timestamp } from 'firebase/firestore';

interface UserData {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    associateNumber: string;
    initials: string
}

interface AppointmentData {
    id: string;
    primaryOwnerId: string;
    coOwners: string[];
    coOwnersMeta: {
        [userId: string]:{
            initials: string;
        }
    }
    clientId: string;
    clientName: string;
    clientLastName: string;
    notes: string;
    createdAt: Timestamp;
    date: Timestamp;
    leadStatus: 'Hot' | 'Warm' | 'Cold'; // Literal types prevent spelling bugs
    saleStatus: 'set_up' | 'pending_callback' | 'discarted' | 'sale_closed'
}

interface ClientData {
    id: string;
    ownerId: string;
    ownerInitials:string;
    name: string;
    lastName: string;
    notes: string
    dateCreatedAt: Timestamp;
    address?: string;
    city?: string;
    state: string;
    zip?: string;
    phone: string;
    email?: string;
    birthdate?: string;
    anniversary?: string;
    significantOtherName?: string;
    significantOtherBirthdate?: string;
    ringSize?: string;
}

export type { UserData, AppointmentData, ClientData }