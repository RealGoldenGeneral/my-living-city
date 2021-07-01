/*
  Warnings:

  - Added the required column `user_segment_id` to the `idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "user_segment_id" INTEGER NOT NULL,
ADD COLUMN     "user_sub_segemtn_id" INTEGER;
