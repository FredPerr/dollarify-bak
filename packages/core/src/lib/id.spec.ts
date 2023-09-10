import { IDFactory, isUUID } from './id';

describe('id validation and generation', () => {
  it('should validate a valid uuid', () => {
    expect(isUUID('C73BCDCC-2669-4Bf6-81d3-E4AE73FB11FD')).toBeTruthy();
    expect(isUUID('c73bcdcc-2669-4bf6-81d3-e4an73fb11fd')).toBeFalsy();
  });
  it('should generate a v4 uuid', () => {
    expect(isUUID(IDFactory.uuid())).toBeTruthy();
  });
  it('should generate the next int ID', () => {
    expect(IDFactory.id()).toBe(0);
    expect(IDFactory.id()).toBe(1);
  });
});
