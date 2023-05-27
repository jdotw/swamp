-- AlterTable
ALTER TABLE "capability_types" ADD COLUMN     "role_type_id" INTEGER;

-- AddForeignKey
ALTER TABLE "capability_types" ADD CONSTRAINT "capability_types_role_type_id_fkey" FOREIGN KEY ("role_type_id") REFERENCES "role_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
