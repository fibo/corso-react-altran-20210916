import { baseUrl } from '../api';

const initialState = {
  fetchTodoListRequestIsWaiting: false,
  list: [],
};

const FETCH_TODO_LIST_REQUEST = 'FETCH_TODO_LIST_REQUEST';
const FETCH_TODO_LIST_SUCCESS = 'FETCH_TODO_LIST_SUCCESS';
const FETCH_TODO_LIST_FAILURE = 'FETCH_TODO_LIST_FAILURE';

export const selectTodoList = (state) => state.todos.list;
export const selectActiveTodos = (state) => state.todos.list.filter((todo) => !todo.completed);
export const selectCompletedTodos = (state) => state.todos.list.filter((todo) => todo.completed);

export const destroyTodo = (id) => ({
  type: 'DESTROY_TODO',
  id,
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});

export const toggleToDo = (checked, id) => ({
  type: 'TOGGLE_TODO',
  checked,
  id,
});

export const toogleAllTodos = (checked) => ({
  type: 'TOGGLE_ALL_TODOS',
  checked,
});

export const createTodo = (text) => {
  return {
    type: 'CREATE_TODO',
    text,
  };
};

export const fetchTodoList = () => (dispatch, getState) => {
  const state = getState();

  if (state.todos.fetchTodoListRequestIsWaiting) return;

  dispatch({ type: FETCH_TODO_LIST_REQUEST });

  fetch(`${baseUrl}/todos`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({ type: FETCH_TODO_LIST_FAILURE });
      }
    })
    .then((data) => {
      dispatch({ type: FETCH_TODO_LIST_SUCCESS, data });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: FETCH_TODO_LIST_FAILURE });
    });
};

export default function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_TODO_LIST_REQUEST: {
      return {
        ...state,
        fetchTodoListRequestIsWaiting: true,
      };
    }

    case FETCH_TODO_LIST_SUCCESS: {
      return {
        ...state,
        fetchTodoListRequestIsWaiting: false,
        list: action.data,
      };
    }

    case FETCH_TODO_LIST_FAILURE: {
      return {
        ...state,
        fetchTodoListRequestIsWaiting: false,
      };
    }

    case 'TOGGLE_TODO': {
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === action.id) {
            return {
              ...todo,
              completed: action.checked,
            };
          } else {
            return todo;
          }
        }),
      };
    }

    case 'TOGGLE_ALL_TODOS': {
      return {
        ...state,
        list: state.list.map((todo) => {
          return {
            ...todo,
            completed: action.checked,
          };
        }),
      };
    }
    case 'CREATE_TODO': {
      if (action.text == '') {
        return state;
      }
      const id = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);
      return {
        ...state,
        list: state.list.concat({ id, text: action.text, completed: false }),
      };
    }

    case 'CLEAR_COMPLETED': {
      return {
        ...state,
        list: state.list.filter((todo) => {
          return !todo.completed;
        }),
      };
    }

    case 'DESTROY_TODO': {
      return {
        ...state,
        list: state.list.filter((todo) => todo.id != action.id),
      };
    }

    default: {
      return state;
    }
  }
}
