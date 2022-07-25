/*
  Warnings:

  - You are about to drop the `CommentFlag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentFlag" DROP CONSTRAINT "CommentFlag_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentFlag" DROP CONSTRAINT "CommentFlag_flagger_id_fkey";

-- DropTable
DROP TABLE "CommentFlag";

-- CreateTable
CREATE TABLE "comment_flag" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "flagger_id" TEXT NOT NULL,
    "false_flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "comment_flag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threshhold" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "Threshhold_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment_flag" ADD CONSTRAINT "comment_flag_flagger_id_fkey" FOREIGN KEY ("flagger_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_flag" ADD CONSTRAINT "comment_flag_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "idea_comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
