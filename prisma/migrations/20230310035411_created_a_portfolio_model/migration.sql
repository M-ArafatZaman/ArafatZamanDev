-- CreateTable
CREATE TABLE "Portfolio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "short_description" TEXT,
    "content" TEXT NOT NULL,
    "tags" TEXT,
    "image" TEXT NOT NULL DEFAULT 'https://i.imgur.com/sRi3pGm.png',
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_name_key" ON "Portfolio"("name");
