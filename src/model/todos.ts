export type TodoFilter = 'all' | 'completed' | 'active'
export type Todo =  {
    text : string
    completed : boolean
    id : number
}
export const todosFilters = ['all', 'completed', 'active'];

export function isFilter(filter : TodoFilter) {
  return todosFilters.includes(filter);
}