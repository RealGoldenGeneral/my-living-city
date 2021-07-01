/*
  Warnings:

  - You are about to drop the column `user_segment_id` on the `idea` table. All the data in the column will be lost.
  - You are about to drop the column `user_sub_segemtn_id` on the `idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "idea" DROP COLUMN "user_segment_id",
DROP COLUMN "user_sub_segemtn_id";
