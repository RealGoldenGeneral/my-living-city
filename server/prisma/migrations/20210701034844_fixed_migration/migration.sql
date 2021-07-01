-- AlterEnum
ALTER TYPE "user_type" ADD VALUE 'DEFAULT';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "user_type" SET DEFAULT 'DEFAULT';
