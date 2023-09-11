import { InflatableItem } from '.';

class Loan extends InflatableItem {
  constructor(
    name: string,
    desc: string,
    given_on: Date,
    date: Date,
    amount: number,
    interests_percent: number,
    interests_delay: number,
    interests_continous: boolean
  ) {
    super(
      name,
      desc,
      date,
      amount,
      interests_percent,
      interests_delay,
      interests_continous
    );
  }

  /**@deprecate The time at which the interests starts compounding is the date on which the loan is effective.*/
  project(date: Date): number {
    return super.project(date);
  }
}

export { Loan };
