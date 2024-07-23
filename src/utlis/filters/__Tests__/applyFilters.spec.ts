import { applyFilters, Filter } from '../applyFilters';

describe('applyFilters', () => {
  it('should return all items if no filters are applied', () => {
    const items = [1, 2, 3];
    const filters: Filter<number>[] = [];
    const result = applyFilters(items, filters);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should filter items based on a single filter', () => {
    const items = [1, 2, 3, 4];
    const filters: Filter<number>[] = [(item) => item % 2 === 0];
    const result = applyFilters(items, filters);
    expect(result).toEqual([2, 4]);
  });

  it('should filter items based on multiple filters', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const filters: Filter<number>[] = [
      (item) => item % 2 === 0,
      (item) => item > 3,
    ];
    const result = applyFilters(items, filters);
    expect(result).toEqual([4, 6]);
  });

  it('should return an empty array if all items are filtered out', () => {
    const items = [1, 2, 3, 4];
    const filters: Filter<number>[] = [
      (item) => item > 4,
    ];
    const result = applyFilters(items, filters);
    expect(result).toEqual([]);
  });

  it('should handle items of complex types', () => {
    type ComplexItem = { id: number; name: string; active: boolean };
    const items: ComplexItem[] = [
      { id: 1, name: 'Item 1', active: false },
      { id: 2, name: 'Item 2', active: true },
      { id: 3, name: 'Item 3', active: false },
    ];
    const filters: Filter<ComplexItem>[] = [
      (item) => item.active,
      (item) => item.name.includes('2'),
    ];
    const result = applyFilters(items, filters);
    expect(result).toEqual([{ id: 2, name: 'Item 2', active: true }]);
  });

  it('should not modify the original items array', () => {
    const items = [1, 2, 3, 4];
    const originalItems = [...items];
    const filters: Filter<number>[] = [(item) => item % 2 === 0];
    applyFilters(items, filters);
    expect(items).toEqual(originalItems);
  });
});