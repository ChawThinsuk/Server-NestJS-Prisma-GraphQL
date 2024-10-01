-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
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
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "CategorySublevel1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategorySublevel1_itemId_key" ON "CategorySublevel1"("itemId");

-- AddForeignKey
ALTER TABLE "CategorySublevel1" ADD CONSTRAINT "CategorySublevel1_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
