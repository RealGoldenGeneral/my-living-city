-- CreateTable
CREATE TABLE "user_reach" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "segId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_reach_unique" ON "user_reach"("user_id", "segId");

-- AddForeignKey
ALTER TABLE "user_reach" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_reach" ADD FOREIGN KEY ("segId") REFERENCES "segment"("seg_id") ON DELETE CASCADE ON UPDATE CASCADE;
