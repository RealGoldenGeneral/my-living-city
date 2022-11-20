/*
  Warnings:

  - Added the required column `author_id` to the `ban_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `ban_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ban_comment" ADD COLUMN     "author_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ban_post" ADD COLUMN     "author_id" TEXT NOT NULL;
