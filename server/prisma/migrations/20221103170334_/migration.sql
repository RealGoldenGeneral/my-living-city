/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Ban` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ban.user_id_unique" ON "Ban"("user_id");
