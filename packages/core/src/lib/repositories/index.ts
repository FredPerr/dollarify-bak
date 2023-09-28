import {
  user_repository,
  cash_repository,
  debt_repository,
  income_repository,
  account_repository,
  expense_repository,
  scenario_repository,
  investment_repository,
} from '../repositories/prisma/index';

export const repositories = {
  user: user_repository,
  cash: cash_repository,
  debt: debt_repository,
  income: income_repository,
  account: account_repository,
  expense: expense_repository,
  scenario: scenario_repository,
  investment: investment_repository,
};
