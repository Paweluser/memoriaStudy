import prisma from '@/lib/prisma';

export async function getAllTeams() {
    return await prisma.team.findMany({ 
        orderBy: {
            id: 'asc',
        },
        include: {
            _count: {
                select: { employees: true }, 
            },
        },
    });
}

export async function getTeamById(id: number) {
    return await prisma.team.findUnique({
        where: { id },
        include: {
            employees: { 
                select: {
                    id: true,
                    firstName: true, 
                    lastName: true,  
                    role: true,      
                }
            }
        }
    });
}

export async function getAvailableEmployees() {
    return await prisma.employee.findMany({ 
        where: {
            teamId: null 
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
        },
        orderBy: {
            lastName: 'asc' 
        }
    });
}