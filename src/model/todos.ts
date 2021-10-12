export type TodoFilter = 'all' | 'completed' | 'active'
export const todosFilters = ['all', 'completed', 'active'];

export function isFilter(filter : TodoFilter) {
  return todosFilters.includes(filter);
}