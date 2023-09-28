import { repositories } from '../repositories/index';
import UserService from './models/UserService';
import ExpenseService from './models/ExpenseService';
import LoanService from './models/LoanService';
import CashService from './models/CashService';
import DebtService from './models/DebtService';
import IncomeService from './models/IncomeService';
import InvestmentService from './models/InvestmentService';

export const userService = new UserService(
  repositories.user,
  repositories.account
);
export const expenseService = new ExpenseService(repositories.expense);
export const loanService = new LoanService(repositories.loan);
export const cashService = new CashService(repositories.cash);
export const debtService = new DebtService(repositories.debt);
export const incomeService = new IncomeService(repositories.income);
export const investmentService = new InvestmentService(repositories.investment);
//export const scenarioService = new ScenarioService(repositories.scenario)

export const services = {
  user: userService,
  expense: expenseService,
  loan: loanService,
  income: incomeService,
  debt: debtService,
  cash: cashService,
  investment: investmentService,
};

export default services;
