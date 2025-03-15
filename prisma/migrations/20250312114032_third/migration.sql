/*
  Warnings:

  - You are about to drop the column `authorUsername` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorUsername_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorUsername";
