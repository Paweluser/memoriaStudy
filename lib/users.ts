import prisma from './prisma';

export async function createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string, 
) {
    return await prisma.employee.create({ 
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: 'EMPLOYEE', 
        },
    });
}

export async function getUserByEmail(email: string) {
    return await prisma.employee.findUnique({
        where: { email: email },
    });
}

export async function getEmployees() {
  return await prisma.employee.findMany({
    include: {
      team: true, 
    },
    orderBy: {
      lastName: 'asc', 
    },
  });
}

export async function getOperationalEmployees() {
    return await prisma.employee.findMany({
        where: {
            role: 'EMPLOYEE', 
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
        },
        orderBy: {
            lastName: 'asc',
        }
    });
}

export async function getUserById(id: number) {
    return await prisma.employee.findUnique({
        where: { id: id },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        }
    });
}