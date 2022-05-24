-- CreateTable
CREATE TABLE "user_idea_follow" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "idea_id" INTEGER NOT NULL,
    "followed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_idea_follow_unique" ON "user_idea_follow"("user_id", "idea_id");

-- AddForeignKey
ALTER TABLE "user_idea_follow" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_idea_follow" ADD FOREIGN KEY ("idea_id") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
