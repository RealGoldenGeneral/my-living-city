/*
  Warnings:

  - Added the required column `notification_dismissed` to the `idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "notification_dismissed" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "idea_flag" ADD COLUMN     "flag_reason" TEXT;
