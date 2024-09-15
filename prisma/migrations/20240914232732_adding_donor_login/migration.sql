/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Donor` ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Donor_email_key` ON `Donor`(`email`);
