import { Timestamp } from 'firebase/firestore';

interface UserData {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    associateNumber: string;
}

interface AppointmentData {
    id: string;
    primaryOwnerId: string;
    coOwners: [string?, string?]
    clientId: string;
    date: Timestamp;
    notes: string;
    createdAt: Timestamp;
}

interface ClientData {
    id: string;
    ownerId: string;
    name: string;
    lastName: string;
    notes: string
    dateCreated: Timestamp;
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
    priority: 'hot' | 'cold' | 'warm'
}

export type { UserData, AppointmentData, ClientData }