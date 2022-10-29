/*
  Warnings:

  - The primary key for the `Ban` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Ban` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ban" DROP CONSTRAINT "Ban_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
