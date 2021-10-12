import { TodosState, State, Action, GetState } from './types';
import { Todo } from "../model/todos"
import { baseUrl } from '../api';
import { Dispatch } from 'redux';
import {getTodoList} from '../stores/localstorage';

const initialState: TodosState = {
  fetchTodoListRequestIsWaiting: false,
  list: getTodoList(),
};

const FETCH_TODO_LIST_REQUEST = 'FETCH_TODO_LIST_REQUEST';
export const FETCH_TODO_LIST_SUCCESS = 'FETCH_TODO_LIST_SUCCESS';
const FETCH_TODO_LIST_FAILURE = 'FETCH_TODO_LIST_FAILURE';

type ActionType = typeof FETCH_TODO_LIST_REQUEST | typeof FETCH_TODO_LIST_SUCCESS | typeof FETCH_TODO_LIST_FAILURE | 'TOGGLE_TODO' | 'TOGGLE_ALL_TODOS' | 'CREATE_TODO' | 'CLEAR_COMPLETED' | 'DESTROY_TODO';
type ActionData = Partial<Todo>;


export const selectTodoList = (state: State) => state.todos.list;
export const selectActiveTodos = (state: State) => state.todos.list.filter((todo) => !todo.completed);
export const selectCompletedTodos = (state: State) => state.todos.list.filter((todo) => todo.completed);

export const destroyTodo = (id : Todo["id"]) => ({
  type: 'DESTROY_TODO',
  data: { id },
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});

export const toggleToDo = (completed : Todo["completed"], id : Todo["id"]) => ({
  type: 'TOGGLE_TODO',
  data : { id, completed }
});

export const toogleAllTodos = (completed : Todo["completed"]) => ({
  type: 'TOGGLE_ALL_TODOS',
  data : { completed },
});

export const createTodo = (text : Todo["text"]) => {
  return {
    type: 'CREATE_TODO',
    data : { text },
  };
};

export const fetchTodoList = () => (dispatch : Dispatch, getState : GetState ) => {
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

export default function reducer(state = initialState, action : Action<ActionType, ActionData>) {
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
          if (todo.id === action.data.id) {
            return {
              ...todo,
              completed: action.data.completed,
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
            completed: action.data.completed,
          };
        }),
      };
    }

    case 'CREATE_TODO': {
      // Doing nothing if there is no text in input
      if (typeof action.data.text !== 'string') {
        return state;
      }

      // Generate ID
      const id = new Date().getTime();

      return {
        ...state,
        list: state.list.concat({
          id, 
          text: action.data.text,
          completed: false 
        }),
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
        list: state.list.filter((todo) => todo.id !== action.data.id),
      };
    }

    default: {
      return state;
    }
  }
}
