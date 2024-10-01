/*
  Warnings:

  - You are about to drop the column `itemId` on the `CategorySublevel1` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `CategorySublevel1` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategorySublevel1" DROP CONSTRAINT "CategorySublevel1_itemId_fkey";

-- DropIndex
DROP INDEX "CategorySublevel1_itemId_key";

-- AlterTable
ALTER TABLE "CategorySublevel1" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CategorySublevel1_name_key" ON "CategorySublevel1"("name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "CategorySublevel1"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
