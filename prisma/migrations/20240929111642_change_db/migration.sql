/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `itemImg` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `_CategorySublevel1ToCategorySublevel2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" DROP CONSTRAINT "_CategorySublevel1ToCategorySublevel2_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" DROP CONSTRAINT "_CategorySublevel1ToCategorySublevel2_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "categoryId",
DROP COLUMN "itemImg",
ADD COLUMN     "categorySubLevel1Id" INTEGER;

-- DropTable
DROP TABLE "_CategorySublevel1ToCategorySublevel2";

-- CreateTable
CREATE TABLE "CategorySublevel1To2" (
    "categorySublevel1Id" INTEGER NOT NULL,
    "categorySublevel2Id" INTEGER NOT NULL,

    CONSTRAINT "CategorySublevel1To2_pkey" PRIMARY KEY ("categorySublevel1Id","categorySublevel2Id")
);

-- CreateTable
CREATE TABLE "_CategorySublevel1To2" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategorySublevel1To2_AB_unique" ON "_CategorySublevel1To2"("A", "B");

-- CreateIndex
CREATE INDEX "_CategorySublevel1To2_B_index" ON "_CategorySublevel1To2"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categorySubLevel1Id_fkey" FOREIGN KEY ("categorySubLevel1Id") REFERENCES "CategorySublevel1"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySublevel1To2" ADD CONSTRAINT "CategorySublevel1To2_categorySublevel1Id_fkey" FOREIGN KEY ("categorySublevel1Id") REFERENCES "CategorySublevel1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySublevel1To2" ADD CONSTRAINT "CategorySublevel1To2_categorySublevel2Id_fkey" FOREIGN KEY ("categorySublevel2Id") REFERENCES "CategorySublevel2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySublevel1To2" ADD CONSTRAINT "_CategorySublevel1To2_A_fkey" FOREIGN KEY ("A") REFERENCES "CategorySublevel1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySublevel1To2" ADD CONSTRAINT "_CategorySublevel1To2_B_fkey" FOREIGN KEY ("B") REFERENCES "CategorySublevel2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
