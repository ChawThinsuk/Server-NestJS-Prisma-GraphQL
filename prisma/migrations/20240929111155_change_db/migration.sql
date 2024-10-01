/*
  Warnings:

  - You are about to drop the column `category1Name` on the `CategorySublevel2` table. All the data in the column will be lost.
  - You are about to drop the column `categoryName` on the `Item` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategorySublevel2" DROP CONSTRAINT "CategorySublevel2_category1Name_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryName_fkey";

-- AlterTable
ALTER TABLE "CategorySublevel1" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CategorySublevel1_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CategorySublevel2" DROP COLUMN "category1Name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CategorySublevel2_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "categoryName",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_CategorySublevel1ToCategorySublevel2" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategorySublevel1ToCategorySublevel2_AB_unique" ON "_CategorySublevel1ToCategorySublevel2"("A", "B");

-- CreateIndex
CREATE INDEX "_CategorySublevel1ToCategorySublevel2_B_index" ON "_CategorySublevel1ToCategorySublevel2"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategorySublevel1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" ADD CONSTRAINT "_CategorySublevel1ToCategorySublevel2_A_fkey" FOREIGN KEY ("A") REFERENCES "CategorySublevel1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" ADD CONSTRAINT "_CategorySublevel1ToCategorySublevel2_B_fkey" FOREIGN KEY ("B") REFERENCES "CategorySublevel2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
