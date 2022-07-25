/*
  Warnings:

  - You are about to drop the `IdeaFlag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IdeaFlag" DROP CONSTRAINT "IdeaFlag_flagger_id_fkey";

-- DropForeignKey
ALTER TABLE "IdeaFlag" DROP CONSTRAINT "IdeaFlag_idea_id_fkey";

-- DropTable
DROP TABLE "IdeaFlag";

-- CreateTable
CREATE TABLE "idea_flag" (
    "id" SERIAL NOT NULL,
    "idea_id" INTEGER NOT NULL,
    "flagger_id" TEXT NOT NULL,

    CONSTRAINT "idea_flag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "idea_flag" ADD CONSTRAINT "idea_flag_flagger_id_fkey" FOREIGN KEY ("flagger_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idea_flag" ADD CONSTRAINT "idea_flag_idea_id_fkey" FOREIGN KEY ("idea_id") REFERENCES "idea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
