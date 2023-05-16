import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const incoming = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  middle_names: z.string().optional(),
});

export default eventHandler(async (event) => {
  const { id } = event.context.params ?? {};
  const body = await readBody(event);
  const data = incoming.safeParse(body);
  if (data.success) {
    return await prisma.person.update({
      where: { id: parseInt(id) },
      data: data.data,
    });
  }
});
