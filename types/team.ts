export type TeamMember = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
};

export type TeamWithCount = {
    id: number;
    teamName: string;
    _count: {
        employees: number; 
    };
};