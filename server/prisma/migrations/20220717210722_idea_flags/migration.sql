-- CreateTable
CREATE TABLE "IdeaFlag" (
    "id" SERIAL NOT NULL,
    "idea_id" INTEGER NOT NULL,
    "flagger_id" TEXT NOT NULL,

    CONSTRAINT "IdeaFlag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IdeaFlag" ADD CONSTRAINT "IdeaFlag_flagger_id_fkey" FOREIGN KEY ("flagger_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
