-- CreateTable
CREATE TABLE "EmissionEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "emission" REAL NOT NULL,
    "date" DATETIME NOT NULL
);
