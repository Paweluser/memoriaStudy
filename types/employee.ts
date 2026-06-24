export type EmployeeWithRelations = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    team: { teamName: string } | null;
};