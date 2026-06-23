import prisma from './prisma'; 

export async function getAllCeremonies() {
  return await prisma.ceremony.findMany({
    orderBy: {
      id: 'desc', 
    },
    include: {
      deceased: true,        
      client: true, 
    },
  });
}

export async function getCeremonyById(id: number) {
  return await prisma.ceremony.findUnique({
    where: { 
        id: id 
    },
    include: {
      deceased: true,
      client: true, 
      team: true,
    },
  });
}