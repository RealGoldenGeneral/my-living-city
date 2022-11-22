/*
  Warnings:

  - You are about to drop the `Ban` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ban_user_type" AS ENUM ('WARNING', 'POST_BAN', 'SYS_BAN');

-- DropForeignKey
ALTER TABLE "Ban" DROP CONSTRAINT "Ban_user_id_fkey";

-- AlterTable
ALTER TABLE "comment_flag" ADD COLUMN     "flag_reason" TEXT;

-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "proposal_benefits" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "proposal_role" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "requirements" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "idea_comment" ADD COLUMN     "notification_dismissed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "proposal" ADD COLUMN     "feedback_type_1" TEXT,
ADD COLUMN     "feedback_type_2" TEXT,
ADD COLUMN     "feedback_type_3" TEXT,
ADD COLUMN     "feedback_type_4" TEXT,
ADD COLUMN     "feedback_type_5" TEXT;

-- DropTable
DROP TABLE "Ban";

-- CreateTable
CREATE TABLE "ban_user" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "ban_type" "ban_user_type" NOT NULL DEFAULT E'WARNING',
    "ban_reason" TEXT NOT NULL,
    "ban_message" TEXT,
    "banned_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banned_until" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_dismissed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ban_post" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "ban_reason" TEXT NOT NULL,
    "ban_message" TEXT,
    "banned_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_dismissed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ban_comment" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "author_id" TEXT NOT NULL,
    "ban_reason" TEXT NOT NULL,
    "ban_message" TEXT,
    "banned_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_dismissed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ban_user" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ban_post" ADD FOREIGN KEY ("post_id") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ban_comment" ADD FOREIGN KEY ("comment_id") REFERENCES "idea_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
