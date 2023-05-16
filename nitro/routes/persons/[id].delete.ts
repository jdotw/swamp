import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const { id } = event.context.params ?? {};
  const person = await prisma.person.findUnique({
    where: { id: parseInt(id) },
  });
  if (!person) {
    sendError(event, createError({ statusCode: 404, message: "Not found" }));
  }
  await prisma.person.update({
    where: { id: parseInt(id) },
    data: { ...person, offboarded_at: new Date().toISOString() },
  });
  sendNoContent(event);
});
