/*
  Warnings:

  - You are about to drop the column `categorySublevel1Id` on the `CategorySublevel2` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategorySublevel2" DROP CONSTRAINT "CategorySublevel2_categorySublevel1Id_fkey";

-- AlterTable
ALTER TABLE "CategorySublevel2" DROP COLUMN "categorySublevel1Id";

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
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" ADD CONSTRAINT "_CategorySublevel1ToCategorySublevel2_A_fkey" FOREIGN KEY ("A") REFERENCES "CategorySublevel1"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" ADD CONSTRAINT "_CategorySublevel1ToCategorySublevel2_B_fkey" FOREIGN KEY ("B") REFERENCES "CategorySublevel2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
