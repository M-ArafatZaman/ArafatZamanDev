-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "short_description" TEXT,
    "detail_description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT 'https://i.imgur.com/UzjI8sf.png',
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT
);
INSERT INTO "new_Projects" ("date_created", "detail_description", "id", "image_url", "name", "short_description", "slug") SELECT "date_created", "detail_description", "id", "image_url", "name", "short_description", "slug" FROM "Projects";
DROP TABLE "Projects";
ALTER TABLE "new_Projects" RENAME TO "Projects";
CREATE UNIQUE INDEX "Projects_name_key" ON "Projects"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
