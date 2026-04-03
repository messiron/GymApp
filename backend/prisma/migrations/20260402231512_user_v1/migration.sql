-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserAgeGroup" AS ENUM ('UNDER_18', 'BETWEEN_18_AND_30', 'OVER_30');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('MASCULINE', 'FEMININE');

-- CreateEnum
CREATE TYPE "UserInterest" AS ENUM ('LOSE_WEIGHT', 'BUILD_MUSCULE', 'IMPROVE_HEALTH', 'CALISTHENICS');

-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isProfileCompleted" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "UserRole" NOT NULL,
    "ageGroup" "UserAgeGroup",
    "gender" "UserGender",
    "interests" "UserInterest"[],
    "level" "UserLevel",
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
