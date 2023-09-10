/*
  Warnings:

  - Added the required column `interests_continuous` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_continuous` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_continuous` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interests_continuous` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Investment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "snapshotId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "recurring_delay" INTEGER NOT NULL,
    "iterations" INTEGER NOT NULL,
    "interests_percent" REAL NOT NULL,
    "interests_delay" INTEGER NOT NULL,
    "interests_continuous" BOOLEAN NOT NULL,
    CONSTRAINT "Investment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Investment_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Investment" ("amount", "date", "desc", "id", "interests_delay", "interests_percent", "iterations", "name", "profileId", "recurring_delay", "snapshotId") SELECT "amount", "date", "desc", "id", "interests_delay", "interests_percent", "iterations", "name", "profileId", "recurring_delay", "snapshotId" FROM "Investment";
DROP TABLE "Investment";
ALTER TABLE "new_Investment" RENAME TO "Investment";
CREATE UNIQUE INDEX "Investment_profileId_key" ON "Investment"("profileId");
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "snapshotId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "interests_percent" REAL NOT NULL,
    "interests_delay" INTEGER NOT NULL,
    "interests_continuous" BOOLEAN NOT NULL,
    CONSTRAINT "Loan_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("amount", "date", "desc", "id", "interests_delay", "interests_percent", "name", "profileId", "snapshotId") SELECT "amount", "date", "desc", "id", "interests_delay", "interests_percent", "name", "profileId", "snapshotId" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE UNIQUE INDEX "Loan_profileId_key" ON "Loan"("profileId");
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "snapshotId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "recurring_delay" INTEGER NOT NULL,
    "iterations" INTEGER NOT NULL,
    "interests_percent" REAL NOT NULL,
    "interests_delay" INTEGER NOT NULL,
    "interests_continuous" BOOLEAN NOT NULL,
    CONSTRAINT "Expense_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("amount", "date", "desc", "id", "interests_delay", "interests_percent", "iterations", "name", "profileId", "recurring_delay", "snapshotId") SELECT "amount", "date", "desc", "id", "interests_delay", "interests_percent", "iterations", "name", "profileId", "recurring_delay", "snapshotId" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
CREATE UNIQUE INDEX "Expense_profileId_key" ON "Expense"("profileId");
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "snapshotId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "recurring_delay" INTEGER NOT NULL,
    "iterations" INTEGER NOT NULL,
    "interests_percent" REAL NOT NULL,
    "interests_delay" INTEGER NOT NULL,
    "interests_continuous" BOOLEAN NOT NULL,
    CONSTRAINT "Income_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("amount", "date", "desc", "id", "interests_delay", "interests_percent", "iterations", "name", "profileId", "recurring_delay", "snapshotId") SELECT "amount", "date", "desc", "id", "interests_delay", "interests_percent", "iterations", "name", "profileId", "recurring_delay", "snapshotId" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
CREATE UNIQUE INDEX "Income_profileId_key" ON "Income"("profileId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
