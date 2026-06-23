export type CeremonyWithRelations = {
    id: number;
    city: string;
    funeralDate: Date;
    deceased: {
        firstName: string;
        lastName: string;
    } | null;
    client: {
        firstName: string;
        lastName: string;
    } | null;
};

export type TransportWithRelations = {
    id: number;
    transportFrom: string;
    transportTo: string;
    clientPhoneNumber: string;
    manager: {
        firstName: string;
        lastName: string;
    } | null;
    assistant: {
        firstName: string;
        lastName: string;
    } | null;
};