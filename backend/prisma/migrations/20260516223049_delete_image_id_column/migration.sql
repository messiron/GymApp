/*
  Warnings:

  - You are about to drop the column `gif_id` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `MuscleGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "gif_id";

-- AlterTable
ALTER TABLE "MuscleGroup" DROP COLUMN "image_id";
