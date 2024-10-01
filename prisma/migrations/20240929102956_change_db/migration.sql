/*
  Warnings:

  - The primary key for the `CategorySublevel1` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CategorySublevel1` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategorySublevel1" DROP CONSTRAINT "CategorySublevel1_pkey",
DROP COLUMN "id";

-- CreateTable
CREATE TABLE "CategorySublevel2" (
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "category1Name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CategorySublevel2_name_key" ON "CategorySublevel2"("name");

-- AddForeignKey
ALTER TABLE "CategorySublevel2" ADD CONSTRAINT "CategorySublevel2_category1Name_fkey" FOREIGN KEY ("category1Name") REFERENCES "CategorySublevel1"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
