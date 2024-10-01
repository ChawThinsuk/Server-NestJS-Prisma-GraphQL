/*
  Warnings:

  - You are about to drop the `_CategorySublevel1ToCategorySublevel2` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categorySublevel1Id` to the `CategorySublevel2` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" DROP CONSTRAINT "_CategorySublevel1ToCategorySublevel2_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySublevel1ToCategorySublevel2" DROP CONSTRAINT "_CategorySublevel1ToCategorySublevel2_B_fkey";

-- AlterTable
ALTER TABLE "CategorySublevel2" ADD COLUMN     "categorySublevel1Id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategorySublevel1ToCategorySublevel2";

-- AddForeignKey
ALTER TABLE "CategorySublevel2" ADD CONSTRAINT "CategorySublevel2_categorySublevel1Id_fkey" FOREIGN KEY ("categorySublevel1Id") REFERENCES "CategorySublevel1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
