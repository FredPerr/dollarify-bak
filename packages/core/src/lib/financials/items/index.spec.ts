import {
  BaseItem,
  InflatableItem,
  IterableItem,
  IterableInterestsItem,
} from './index';

describe('Financial bases item calculation', () => {
  it('should create a valid active BaseItem', () => {
    const item = new BaseItem('name', 'desc', new Date(2000, 0, 1), 100);
    expect(item.isActive(new Date(2001, 0, 1))).toBeTruthy();
    expect(item.isActive(new Date(1999, 0, 1))).toBeFalsy();
    expect(item.project(new Date(1999, 0, 1))).toBe(0);
    expect(item.project(new Date(2001, 0, 1))).toBe(100);
  });
  it('should create a valid IterableItem', () => {
    const item = new IterableItem(
      'name',
      'desc',
      new Date(2000, 0, 1),
      100,
      3,
      24,
      false
    );
    expect(item.getRepetitionsCount(new Date(2000, 0, 5))).toBe(3);
    expect(item.getRepetitionsCount(new Date(2000, 0, 3))).toBe(2);

    expect(item.isRepeating()).toBeTruthy();

    expect(item.isActive(new Date(2000, 0, 1))).toBeTruthy();
    expect(item.isActive(new Date(2000, 0, 3))).toBeTruthy();
    expect(item.isActive(new Date(2000, 0, 5))).toBeFalsy();

    item.recurring_delay = 0;
    expect(item.isRepeating()).toBeFalsy();
    expect(item.isActive(new Date(2000, 0, 1))).toBeFalsy();

    item.recurring_delay = 24;
    item.iterations = 0;
    expect(item.isActive(new Date(2000, 0, 1))).toBeTruthy();
    expect(item.isActive(new Date(1999, 0, 1))).toBeFalsy();

    item.iterations = 3;
    expect(item.project(new Date(2000, 0, 1))).toBe(100);
    expect(item.project(new Date(2000, 0, 10))).toBe(400);
    item.recurring_delay = 12;
    expect(item.project(new Date(2000, 0, 1))).toBe(item.amount);
    expect(item.project(new Date(2000, 0, 2))).toBe(item.amount * 3);
    item.continuous = true;
    expect(item.project(new Date(2000, 0, 1, 1))).toBeGreaterThan(item.amount);
  });

  it('should create a valid InflatableItem', () => {
    const item = new InflatableItem(
      'name',
      'desc',
      new Date(2000, 0, 1),
      100,
      0.1,
      24 * 365,
      false
    );
    expect(item.isActive(new Date(2001, 0, 1))).toBeTruthy();
    expect(item.isActive(new Date(1999, 0, 1))).toBeFalsy();

    expect(item.project(new Date(2000, 0, 1, 2))).toBe(item.amount);
    expect(item.project(new Date(2001, 0, 1))).toBeCloseTo(110.0);
    expect(item.project(new Date(2002, 0, 1))).toBeCloseTo(121.0);

    expect(item.project(new Date(2000, 6, 1))).toBe(item.amount);

    item.interests_continuous = true;
    expect(item.project(new Date(2000, 6, 1, 2))).toBeGreaterThan(item.amount);
  });

  it('should create a valid IterableInterestsItem', () => {
    const item = new IterableInterestsItem(
      'name',
      'desc',
      new Date(2000, 0, 1),
      100,
      3,
      24,
      false,
      0.1,
      2 * 24,
      false
    );
    expect(item._calculateInterestsAndRecurringDelayRatio()).toBe(2);

    expect(item.project(new Date(2000, 0, 4))).toBeCloseTo(315.25);
    expect(item.project(new Date(2000, 0, 6))).toBeCloseTo(347.56);

    item.continuous = true;
    expect(item.project(new Date(2000, 0, 6))).toBeCloseTo(347.56);

    item.interests_continuous = true;
    expect(item.project(new Date(2000, 0, 6, 4))).toBeGreaterThan(347.56);
  });
});
