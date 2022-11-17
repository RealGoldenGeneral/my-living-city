/*
  Warnings:

  - You are about to drop the `Ban` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ban" DROP CONSTRAINT "Ban_user_id_fkey";

-- DropTable
DROP TABLE "Ban";

-- CreateTable
CREATE TABLE "ban_post" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
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
    "ban_message" TEXT,
    "banned_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_dismissed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ban_post" ADD FOREIGN KEY ("post_id") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ban_comment" ADD FOREIGN KEY ("comment_id") REFERENCES "idea_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
