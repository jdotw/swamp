-- DropForeignKey
ALTER TABLE "titles" DROP CONSTRAINT "titles_track_id_fkey";

-- AlterTable
ALTER TABLE "titles" ALTER COLUMN "track_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "titles" ADD CONSTRAINT "titles_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
