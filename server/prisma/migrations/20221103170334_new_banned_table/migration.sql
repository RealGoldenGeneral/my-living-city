CREATE UNIQUE INDEX "Ban.user_id_unique" ON "Ban"("user_id");

-- CreateEnum
CREATE TYPE "ban_user_type" AS ENUM ('WARNING', 'POST_BAN', 'SYS_BAN');

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
    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ban_user" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;