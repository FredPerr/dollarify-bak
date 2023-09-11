import { IterableInterestsItem } from '.';

class Investment extends IterableInterestsItem {
  constructor(
    name: string,
    desc: string,
    date: Date,
    amount: number,
    iterations: number,
    recurring_delay: number,
    continuous: boolean,
    interests_percent: number,
    interests_delay: number
  ) {
    super(
      name,
      desc,
      date,
      amount,
      iterations,
      recurring_delay,
      continuous,
      interests_percent,
      interests_delay,
      false
    );
  }
}

export { Investment };
