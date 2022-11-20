-- AlterTable
ALTER TABLE "idea" ADD COLUMN     "proposal_benefits" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "proposal_role" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "requirements" TEXT NOT NULL DEFAULT E'';
