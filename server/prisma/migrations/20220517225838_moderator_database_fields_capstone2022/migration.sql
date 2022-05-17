-- AlterEnum
ALTER TYPE "user_type" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "banned_idea" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "idea_flag_num" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "idea_comment" ADD COLUMN     "banned_comment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "comment_flag_num" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "has_flagged" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_flagged" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Ban" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ban_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "banned_until" TIMESTAMP(3) NOT NULL,
    "ban_message" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ban" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
