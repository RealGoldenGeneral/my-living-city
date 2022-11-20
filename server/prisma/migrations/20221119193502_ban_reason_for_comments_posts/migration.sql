/*
  Warnings:

  - Added the required column `ban_reason` to the `ban_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ban_reason` to the `ban_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ban_comment" ADD COLUMN     "ban_reason" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ban_post" ADD COLUMN     "ban_reason" TEXT NOT NULL;
