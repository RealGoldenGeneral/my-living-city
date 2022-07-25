-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "idea_comment" ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "reviewed" BOOLEAN NOT NULL DEFAULT false;
