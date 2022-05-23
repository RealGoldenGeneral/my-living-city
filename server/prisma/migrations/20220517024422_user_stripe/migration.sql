-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED');

-- CreateTable
CREATE TABLE "user_stripe" (
    "userId" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'PENDING',

    PRIMARY KEY ("userId","stripeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_stripe_userId_unique" ON "user_stripe"("userId");

-- AddForeignKey
ALTER TABLE "user_stripe" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
