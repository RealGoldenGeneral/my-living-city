/*
  Warnings:

  - The values [PENDING,ACTIVE,CANCELLED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('active', 'incomplete');
ALTER TABLE "user_stripe" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "user_stripe" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "user_stripe" ALTER COLUMN "status" SET DEFAULT 'incomplete';
COMMIT;

-- AlterTable
ALTER TABLE "user_stripe" ALTER COLUMN "status" SET DEFAULT E'incomplete';
