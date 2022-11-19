-- AlterTable
ALTER TABLE "comment_flag" ADD COLUMN     "flag_reason" TEXT;

-- AlterTable
ALTER TABLE "proposal" ADD COLUMN     "feedback_type_1" TEXT,
ADD COLUMN     "feedback_type_2" TEXT,
ADD COLUMN     "feedback_type_3" TEXT,
ADD COLUMN     "feedback_type_4" TEXT,
ADD COLUMN     "feedback_type_5" TEXT;
