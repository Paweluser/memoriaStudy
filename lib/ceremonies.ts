import prisma from './prisma';

export async function getAllCeremonies() {
  return await prisma.ceremonia.findMany({
    orderBy: {
      id: 'desc', 
    },
    include: {
      zmarly: true,        
      zleceniodawca: true, 
    },
  });
}

export async function getCeremonyById(id: number) {
  return await prisma.ceremonia.findUnique({
    where: { 
        id: id 
    },
    include: {
      zmarly: true,
      zleceniodawca: true,
      zespol: true,
    },
  });
}