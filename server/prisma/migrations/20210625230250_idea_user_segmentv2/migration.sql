/*
  Warnings:

  - Made the column `user_sub_segemtn_id` on table `idea` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "idea" ALTER COLUMN "user_sub_segemtn_id" SET NOT NULL;
