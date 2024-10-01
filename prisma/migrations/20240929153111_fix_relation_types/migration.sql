/*
  Warnings:

  - You are about to drop the `ChildTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParentTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChildTable" DROP CONSTRAINT "ChildTable_parentId_fkey";

-- DropTable
DROP TABLE "ChildTable";

-- DropTable
DROP TABLE "ParentTable";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "itemImg" TEXT,
    "desc" TEXT,
    "amount" INTEGER,
    "price" DOUBLE PRECISION,
    "costPrice" DOUBLE PRECISION,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategorySublevel1" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "CategorySublevel1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategorySublevel2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "categorySublevel1Id" INTEGER NOT NULL,

    CONSTRAINT "CategorySublevel2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategorySublevel1_name_key" ON "CategorySublevel1"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategorySublevel2_name_key" ON "CategorySublevel2"("name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategorySublevel1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySublevel2" ADD CONSTRAINT "CategorySublevel2_categorySublevel1Id_fkey" FOREIGN KEY ("categorySublevel1Id") REFERENCES "CategorySublevel1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
