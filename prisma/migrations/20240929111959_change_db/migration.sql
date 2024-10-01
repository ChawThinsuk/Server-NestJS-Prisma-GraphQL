/*
  Warnings:

  - You are about to drop the column `categorySubLevel1Id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `CategorySublevel1To2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategorySublevel1To2` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategorySublevel1To2" DROP CONSTRAINT "CategorySublevel1To2_categorySublevel1Id_fkey";

-- DropForeignKey
ALTER TABLE "CategorySublevel1To2" DROP CONSTRAINT "CategorySublevel1To2_categorySublevel2Id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categorySubLevel1Id_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySublevel1To2" DROP CONSTRAINT "_CategorySublevel1To2_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySublevel1To2" DROP CONSTRAINT "_CategorySublevel1To2_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "categorySubLevel1Id",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "itemImg" TEXT;

-- DropTable
DROP TABLE "CategorySublevel1To2";

-- DropTable
DROP TABLE "_CategorySublevel1To2";

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
