/*
  Warnings:

  - You are about to drop the column `commentorUsername` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `isAuthor` on the `User` table. All the data in the column will be lost.
  - Added the required column `commentorName` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentorUsername_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentorUsername",
ADD COLUMN     "commentorName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAuthor";
