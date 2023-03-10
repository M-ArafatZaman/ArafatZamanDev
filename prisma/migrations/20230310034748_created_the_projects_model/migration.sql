-- CreateTable
CREATE TABLE "Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "short_description" TEXT,
    "detail_description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT 'https://i.imgur.com/UzjI8sf.png',
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
