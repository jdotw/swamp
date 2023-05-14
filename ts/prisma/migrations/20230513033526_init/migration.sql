-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "formedAt" TIMESTAMP(3) NOT NULL,
    "disbandedAt" TIMESTAMP(3),
    "parentId" INTEGER,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
