-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "joined_on" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PreferencesProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lang" TEXT NOT NULL DEFAULT 'EN',
    "notifications_push" BOOLEAN NOT NULL DEFAULT false,
    "notifications_email" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "PreferencesProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FinancialProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FinancialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expense" (
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
    CONSTRAINT "Expense_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Income" (
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
    CONSTRAINT "Income_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "snapshotId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "interests_percent" REAL NOT NULL,
    "interests_delay" INTEGER NOT NULL,
    CONSTRAINT "Loan_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cash" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "snapshotId" INTEGER,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "amount" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Cash_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cash_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Investment" (
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
    CONSTRAINT "Investment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Investment_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" TEXT NOT NULL,
    "last_updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" DATETIME NOT NULL,
    "total_expense" INTEGER NOT NULL,
    "total_income" INTEGER NOT NULL,
    "total_loan" INTEGER NOT NULL,
    "total_cash" INTEGER NOT NULL,
    "total_investment" INTEGER NOT NULL,
    "net_worth" INTEGER NOT NULL,
    CONSTRAINT "Snapshot_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "FinancialProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PreferencesProfile_userId_key" ON "PreferencesProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialProfile_userId_key" ON "FinancialProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_profileId_key" ON "Expense"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Income_profileId_key" ON "Income"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_profileId_key" ON "Loan"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Cash_profileId_key" ON "Cash"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Investment_profileId_key" ON "Investment"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Snapshot_profileId_key" ON "Snapshot"("profileId");
