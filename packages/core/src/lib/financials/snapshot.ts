import { Snapshot } from '@prisma/client';
import { Investment } from './items/investment';
import { Cash } from './items/cash';
import { Loan } from './items/loan';
import { Expense } from './items/expense';
import { Income } from './items/income';

type UpdatePackage = {
  expenses: Expense[];
  incomes: Income[];
  loans: Loan[];
  cashes: Cash[];
  investments: Investment[];
};

/**
 * Update the snapshot content (the object only - not in the DB).
 *
 * @param update Specify the elements of the update, an empty list or a list not specified means the total will be 0.
 */
export function updateSnapshot(
  snapshot: Snapshot,
  date: Date,
  last_updated: Date,
  expires: Date,
  update: Partial<UpdatePackage>
) {
  if (expires < date)
    throw new Error("The snapshot expiration date can't be before the date");

  snapshot.last_updated = last_updated;
  snapshot.date = date;
  snapshot.expires = expires;

  const tot_expense = update.expenses
    ? update.expenses.reduce((acc, cur) => acc + cur.project(date), 0)
    : 0;
  const tot_income = update.incomes
    ? update.incomes.reduce((acc, cur) => acc + cur.project(date), 0)
    : 0;
  const tot_loan = update.loans
    ? update.loans.reduce((acc, cur) => acc + cur.project(date), 0)
    : 0;
  const tot_cash = update.cashes
    ? update.cashes.reduce((acc, cur) => acc + cur.project(date), 0)
    : 0;
  const tot_investments = update.investments
    ? update.investments.reduce((acc, cur) => acc + cur.project(date), 0)
    : 0;

  const tot = tot_income + tot_cash + tot_investments - tot_loan - tot_expense;
  snapshot.net_worth = tot;
  snapshot.total_cash = tot_cash;
  snapshot.total_loan = tot_loan;
  snapshot.total_income = tot_income;
  snapshot.total_expense = tot_expense;
  snapshot.total_investment = tot_investments;
}
