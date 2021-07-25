/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserSegments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_segment_id` to the `idea_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `segment_id` to the `idea_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "idea_comment" ADD COLUMN     "user_segment_id" TEXT NOT NULL,
ADD COLUMN     "segment_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSegments_user_id_unique" ON "UserSegments"("user_id");

-- AddForeignKey
ALTER TABLE "idea_comment" ADD FOREIGN KEY ("user_segment_id") REFERENCES "UserSegments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
