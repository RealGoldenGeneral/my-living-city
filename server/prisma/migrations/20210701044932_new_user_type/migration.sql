-- AlterEnum
ALTER TYPE "user_type" ADD VALUE 'NORMAL';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "user_type" DROP DEFAULT;
