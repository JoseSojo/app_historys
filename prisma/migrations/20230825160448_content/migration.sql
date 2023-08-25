/*
  Warnings:

  - You are about to drop the column `content` on the `Files` table. All the data in the column will be lost.
  - Added the required column `content` to the `Historys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Files` DROP COLUMN `content`;

-- AlterTable
ALTER TABLE `Historys` ADD COLUMN `content` VARCHAR(191) NOT NULL;
