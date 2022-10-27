/*
  Warnings:

  - You are about to drop the column `steps` on the `idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "idea" DROP COLUMN "steps",
ADD COLUMN     "author_details" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "reasons" TEXT NOT NULL DEFAULT E'',
ALTER COLUMN "benefits" SET DEFAULT E'';
