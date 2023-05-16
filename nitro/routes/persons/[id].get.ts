import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const { id } = event.context.params ?? {};
  return await prisma.person.findUnique({
    where: { id: parseInt(id) },
  });
});
