import { Expense } from '@prisma/client';

interface Inflatable
  extends Pick<
    Expense,
    'interests_percent' | 'interests_delay' | 'interests_continuous'
  > {
  /** @returns the number of periods used for interests calculation. If the item is continous, it consider any started period (decimal output) */
  getCompoundingPeriods: (from: Date, to: Date) => number;
}

interface Iterable extends Pick<Expense, 'iterations' | 'recurring_delay'> {
  /** @returns true if the item will perform more than one transaction */
  isRepeating: () => boolean;
  /** @returns the number of repetitions made *after* the initial transaction, i
     but it's maximum value is the number of `iterations` if it is set to a value higher than 0.
  */
  getRepetitionsCount: (date: Date, to: Date) => number;
}

type Base = Pick<Expense, 'name' | 'desc' | 'date' | 'amount'> & {
  project: (date: Date) => number;
  isActive: (date: Date) => boolean;
};

type Ownership = Pick<Expense, 'profileId' | 'snapshotId'>;

export type { Inflatable, Iterable, Base, Ownership };
