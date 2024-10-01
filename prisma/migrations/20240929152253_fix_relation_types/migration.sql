/*
  Warnings:

  - You are about to drop the `CategorySublevel1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategorySublevel2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategorySublevel2" DROP CONSTRAINT "CategorySublevel2_categorySublevel1Id_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- DropTable
DROP TABLE "CategorySublevel1";

-- DropTable
DROP TABLE "CategorySublevel2";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "ParentTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ParentTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildTable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "ChildTable_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildTable" ADD CONSTRAINT "ChildTable_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentTable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
