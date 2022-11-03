-- AlterTable
ALTER TABLE "idea_comment" ADD COLUMN     "quarantined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
