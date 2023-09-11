import { validateMax, validateMin } from '../../utils/validation';
import { Base, Inflatable, Iterable } from '../attributes';

class BaseItem implements Base {
  name: string;
  desc: string;
  date: Date;
  amount: number;

  constructor(name: string, desc: string, date: Date, amount: number) {
    if (!validateMax(50, name.length))
      throw new Error(
        `The name of the financial item ${name} must be 50 characters maximum`
      );

    if (!validateMax(100, desc.length))
      throw new Error(
        `The desc of the financial item ${desc} must be 100 characters maximum`
      );

    this.name = name;
    this.desc = desc;
    this.date = date;
    this.amount = amount;
  }

  isActive(date: Date) {
    return this.date <= date;
  }

  project(date: Date) {
    return this.isActive(date) ? this.amount : 0;
  }
}

class IterableItem extends BaseItem implements Iterable {
  recurring_delay: number;
  iterations: number;
  continuous: boolean;

  constructor(
    name: string,
    desc: string,
    date: Date,
    amount: number,
    iterations: number,
    recurring_delay: number,
    continous: boolean
  ) {
    if (!validateMin(0, recurring_delay))
      throw new Error(
        `The recurring delay for the iterable item ${name} is not valid, it must be 0 or higher.`
      );

    if (!validateMin(0, iterations))
      throw new Error(
        `The number of iterations for ${name} is not valid, it must be 0 or higher.`
      );

    super(name, desc, date, amount);

    this.recurring_delay = recurring_delay;
    this.iterations = iterations;
    this.continuous = continous;
  }

  /**  The financial item is not longer active when the last iteration was made.
   * When a finance item does not repeat, it only counts as a single transaction in time and therefore as no continuity.
   *
   * If a finance item does repeat, it returns true if the `date` comes after the first transaction and before the last iteration.
   */
  isActive(date: Date): boolean {
    if (!this.isRepeating()) return false;

    if (this.iterations == 0) return super.isActive(date);

    return (
      date.getTime() <=
      this.date.getTime() +
        this.iterations * this.recurring_delay * 1000 * 60 * 60
    );
  }

  isRepeating() {
    return this.recurring_delay > 0;
  }

  getRepetitionsCount(to: Date) {
    if (to < this.date) return 0;

    const repetitions =
      (to.getTime() - this.date.getTime()) /
      (this.recurring_delay * 1000 * 60 * 60);
    if (repetitions > this.iterations) return this.iterations;

    return this.continuous ? repetitions : Math.floor(repetitions);
  }

  project(date: Date): number {
    if (!this.isRepeating()) return super.project(date);

    return (this.getRepetitionsCount(date) + 1) * this.amount;
  }
}

class InflatableItem extends BaseItem implements Inflatable {
  interests_delay: number;
  interests_percent: number;
  interests_continuous: boolean;

  constructor(
    name: string,
    desc: string,
    date: Date,
    amount: number,
    interests_percent: number,
    interests_delay: number,
    interests_continuous: boolean
  ) {
    if (interests_delay < 0)
      throw new Error(`The interest delay for ${name} can not be less than 0`);

    super(name, desc, date, amount);
    this.interests_percent = interests_percent;
    this.interests_delay = interests_delay;
    this.interests_continuous = interests_continuous;
  }

  getCompoundingPeriods(from: Date, to: Date) {
    const periods =
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return this.interests_continuous ? periods : Math.floor(periods);
  }

  /** @returns the value + interests on a given date.
   *
   * The interests are added only at the end of the interest period. It does not add continuously
   */
  project(date: Date): number {
    if (this.interests_delay == 0) return super.project(date);

    const n = (365 * 24) / this.interests_delay;
    const t = this.getCompoundingPeriods(this.date, date);
    const value = this.amount * (1 + this.interests_percent / n) ** (n * t);
    return Math.round(value * 100) / 100;
  }
}

class IterableInterestsItem extends IterableItem implements Inflatable {
  interests_percent: number;
  interests_delay: number;
  interests_continuous: boolean;

  constructor(
    name: string,
    desc: string,
    date: Date,
    amount: number,
    iterations: number,
    recurring_delay: number,
    continous: boolean,
    interests_percent: number,
    interests_delay: number,
    interests_continuous: boolean
  ) {
    if (interests_delay < 0)
      throw new Error(`The interest delay for ${name} can not be less than 0`);

    super(name, desc, date, amount, iterations, recurring_delay, continous);
    this.interests_percent = interests_percent;
    this.interests_delay = interests_delay;
    this.interests_continuous = interests_continuous;
  }

  getCompoundingPeriods(date: Date) {
    const periods =
      (date.getTime() - this.date.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return this.interests_continuous ? periods : Math.floor(periods);
  }

  _calculateInterestsAndRecurringDelayRatio() {
    if (this.interests_delay === 0)
      throw new Error(
        `The delay of the interests for the item ${this.name} can't be 0`
      );
    if (this.recurring_delay === 0)
      throw new Error(
        `The delay of the iterations for the item ${this.name} can't be 0`
      );
    return this.interests_delay / this.recurring_delay;
  }

  /**
   * `continuous` is not valid in the context of this projection, but `interests_continuous` is valid.    */
  project(date: Date): number {
    if (
      this.interests_delay == 0 ||
      this.interests_percent == 0 ||
      !this.isRepeating()
    )
      return super.project(date);

    // Simultaneously add from iterations and interests.
    const iterations =
      (date.getTime() - this.date.getTime()) /
      this.recurring_delay /
      (1000 * 60 * 60);
    const simultaneous_periods = Math.min(iterations, this.iterations);
    const r =
      this.interests_percent / this._calculateInterestsAndRecurringDelayRatio();

    const n = this.interests_continuous
      ? simultaneous_periods
      : Math.floor(simultaneous_periods);
    const simultaneous_total = (this.amount * ((1 + r) ** n - 1)) / r;

    // Only add interests (iterations have ended)
    const n2 = Math.max(iterations, this.iterations) - simultaneous_periods;
    if (n2 === 0) return Math.round(100 * simultaneous_total) / 100;
    return Math.round(100 * (simultaneous_total * (1 + r) ** n2)) / 100;
  }
}

export { BaseItem, IterableItem, InflatableItem, IterableInterestsItem };
