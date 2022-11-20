/*
  Warnings:

  - You are about to drop the column `proposal_goal` on the `idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "idea" DROP COLUMN "proposal_goal",
ADD COLUMN     "requirements" TEXT NOT NULL DEFAULT E'';
