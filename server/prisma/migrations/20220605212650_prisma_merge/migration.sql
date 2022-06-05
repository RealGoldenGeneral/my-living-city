/*
  Warnings:

  - You are about to drop the `user_idea_follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "user_type" ADD VALUE 'SUPER_ADMIN';

-- DropForeignKey
ALTER TABLE "user_idea_follow" DROP CONSTRAINT "user_idea_follow_idea_id_fkey";

-- DropForeignKey
ALTER TABLE "user_idea_follow" DROP CONSTRAINT "user_idea_follow_user_id_fkey";

-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "banned_idea" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "idea_flag_num" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "idea_comment" ADD COLUMN     "banned_comment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "comment_flag_num" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "proposal" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "banned_proposal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "has_flagged" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_flagged" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "user_idea_follow";

-- CreateTable
CREATE TABLE "Ban" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ban_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banned_until" TIMESTAMP(3) NOT NULL,
    "ban_message" TEXT,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
