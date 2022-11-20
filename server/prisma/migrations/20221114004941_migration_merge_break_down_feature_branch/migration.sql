/*
  Warnings:

  - You are about to drop the column `proposal_benefits` on the `idea` table. All the data in the column will be lost.
  - You are about to drop the column `proposal_role` on the `idea` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "idea" DROP COLUMN "proposal_benefits",
DROP COLUMN "proposal_role",
DROP COLUMN "requirements";
