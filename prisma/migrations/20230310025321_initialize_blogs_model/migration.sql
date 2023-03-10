-- CreateTable
CREATE TABLE "Blogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT,
    "tags" TEXT,
    "image" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_name_key" ON "Blogs"("name");
