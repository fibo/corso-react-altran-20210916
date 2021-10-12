import { setTodoList } from '../stores/localstorage';

export const localStorageMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  console.log(state);

  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('lastLogin', new Date().toISOString());

      return next(action);
    case 'LOGOUT':
      localStorage.removeItem('lastLogin');

      return next(action);
    case 'FETCH_TODO_LIST_SUCCESS':
      //localStorage.setItem('todos.list',JSON.stringify(action.data))

      setTodoList(action.data);

      return next(action);
    default:
      return next(action);
  }
};
