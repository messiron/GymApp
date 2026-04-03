/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `EmailCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EmailCode_email_key" ON "EmailCode"("email");
