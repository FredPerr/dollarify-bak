import AccountRepository from './models/AccountRepository';
import CashRepository from './models/CashRepository';
import DebtRepository from './models/DebtRepository';
import ExpenseRepository from './models/ExpenseRepository';
import IncomeRepository from './models/IncomeRepository';
import InvestmentRepository from './models/InvestmentRepository';
import LoanRepository from './models/LoanRepository';
import ScenarioRepository from './models/ScenarioRepository';
import UserRepository from './models/UserRepository';

import { createContext } from './prisma';

export const prisma = createContext().prisma;

export type UserManagerType = typeof prisma.user;
export type AccountManagerType = typeof prisma.account;
export type ScenarioManagerType = typeof prisma.scenario;
export type IncomeManagerType = typeof prisma.income;
export type ExpenseManagerType = typeof prisma.expense;
export type LoanManagerType = typeof prisma.loan;
export type CashManagerType = typeof prisma.cash;
export type InvestmentManagerType = typeof prisma.investment;
export type DebtManagerType = typeof prisma.debt;

export type ManagerType =
  | UserManagerType
  | AccountManagerType
  | ScenarioManagerType
  | IncomeManagerType
  | ExpenseManagerType
  | LoanManagerType
  | CashManagerType
  | InvestmentManagerType
  | DebtManagerType;

export const user_repository = new UserRepository(prisma.user);
export const debt_repository = new DebtRepository(prisma.debt);
export const cash_repository = new CashRepository(prisma.cash);
export const expense_repository = new ExpenseRepository(prisma.expense);
export const income_repository = new IncomeRepository(prisma.income);
export const investment_repository = new InvestmentRepository(
  prisma.investment
);
export const scenario_repository = new ScenarioRepository(prisma.scenario);
export const account_repository = new AccountRepository(prisma.account);
export const loan_repository = new LoanRepository(prisma.loan);
