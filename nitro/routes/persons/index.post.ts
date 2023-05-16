import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const incoming = z.object({
  external_id: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  middle_names: z.string().optional(),
});

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const data = incoming.safeParse(body);

  if (data.success) {
    return await prisma.person.create({ data: data.data });
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: data.error.message }),
  };
});
