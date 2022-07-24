-- CreateTable
CREATE TABLE "CommentFlag" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "flagger_id" TEXT NOT NULL,
    "false_flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CommentFlag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentFlag" ADD CONSTRAINT "CommentFlag_flagger_id_fkey" FOREIGN KEY ("flagger_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentFlag" ADD CONSTRAINT "CommentFlag_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "idea_comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
