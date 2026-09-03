import { Timestamp } from 'firebase/firestore';

interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    associateNumber: string;
    initials: string
}

interface AppointmentData {
    id?: string;
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
    firstName: string;
    lastName: string;
    notes: string
    dateCreatedAt: Timestamp;
    address?: string;
    city?: string;
    state: string;
    zipCode?: string;
    phoneNumber: string;
    email?: string;
    birthdate?: string;
    anniversary?: string;
    significantOtherName?: string;
    significantOtherBirthdate?: string;
    ringSize?: string;
}

export type { UserData, AppointmentData, ClientData }