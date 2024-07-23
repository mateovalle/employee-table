
export type Filter<T> = (item: T) => boolean;

export function applyFilters<T>(items: T[], filters: Filter<T>[]): T[] {
  return filters.reduce((filteredItems, filterFunction) => {
    return filteredItems.filter(filterFunction);
  }, items);
}
