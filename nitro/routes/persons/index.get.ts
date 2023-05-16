import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default eventHandler(async () => {
  const persons = await prisma.person.findMany({
    where: { offboarded_at: null },
  });
  return persons;
});
