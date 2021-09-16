export const todosFilters = ['all', 'completed', 'active'];

export function isFilter(filter) {
  return todosFilters.includes(filter);
}
