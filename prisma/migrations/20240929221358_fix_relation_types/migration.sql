/*
  Warnings:

  - Made the column `amount` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `costPrice` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CategorySublevel1" ALTER COLUMN "desc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CategorySublevel2" ALTER COLUMN "desc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "costPrice" SET NOT NULL;
