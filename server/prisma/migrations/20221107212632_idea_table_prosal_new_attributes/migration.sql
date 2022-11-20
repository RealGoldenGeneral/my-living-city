/*
  Warnings:

  - Added the required column `proposal_benefits` to the `idea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposal_goal` to the `idea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposal_role` to the `idea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "proposal_benefits" TEXT NOT NULL,
ADD COLUMN     "proposal_goal" TEXT NOT NULL,
ADD COLUMN     "proposal_role" TEXT NOT NULL;
