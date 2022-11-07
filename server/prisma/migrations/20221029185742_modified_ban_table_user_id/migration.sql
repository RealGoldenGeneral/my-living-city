/*
  Warnings:

  - You are about to drop the column `userId` on the `Ban` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Ban` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ban" DROP CONSTRAINT "Ban_userId_fkey";

-- AlterTable
ALTER TABLE "Ban" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ban" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
