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