import { TodosState, State, Action, GetState } from './types';
import { Todo } from "../model/todos"
import { baseUrl } from '../api';
import { Dispatch } from 'redux';
import {getTodoList} from '../stores/localstorage';

const initialState: TodosState = {
  fetchTodoListRequestIsWaiting: false,
  list: getTodoList(),
};




type ActionType = 'FETCH_TODO_LIST_REQUEST' | 'FETCH_TODO_LIST_SUCCESS' | 'FETCH_TODO_LIST_FAILURE' | 'TOGGLE_TODO' | 'TOGGLE_ALL_TODOS' | 'CREATE_TODO' | 'CLEAR_COMPLETED' | 'DESTROY_TODO';

type TodosAction =Action<ActionType, ActionData>;
type ToggleTodoData = Pick<Todo, 'completed' | 'id'>;
type ToggleAllTodosData = Pick<Todo, 'completed'>
type CreateTodoData = Pick<Todo, 'text'>
type DestroyTodoData = Pick<Todo, 'id'>
type FetchTodosData = Todo[];
type ActionData = ToggleTodoData | ToggleAllTodosData|CreateTodoData|DestroyTodoData|FetchTodosData;

export const selectTodoList = (state: State) => state.todos.list;
export const selectActiveTodos = (state: State) => state.todos.list.filter((todo) => !todo.completed);
export const selectCompletedTodos = (state: State) => state.todos.list.filter((todo) => todo.completed);

export const destroyTodo = (data :DestroyTodoData) => ({
  type: 'DESTROY_TODO',
  data
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});

export const toggleToDo = (data:ToggleTodoData) => ({
  type: 'TOGGLE_TODO',
  data
});

export const toogleAllTodos = (data:ToggleAllTodosData) => ({
  type: 'TOGGLE_ALL_TODOS',
  data
});

export const createTodo = (data :CreateTodoData):TodosAction => {
  return {
    type: 'CREATE_TODO',
    data
  };
};

export const fetchTodoList = () => (dispatch : Dispatch, getState : GetState ) => {
  const state = getState();

  if (state.todos.fetchTodoListRequestIsWaiting) return;

  dispatch({ type: 'FETCH_TODO_LIST_REQUEST' });

  fetch(`${baseUrl}/todos`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        dispatch({ type: 'FETCH_TODO_LIST_FAILURE' });
      }
    })
    .then((data) => {
      dispatch({ type: 'FETCH_TODO_LIST_SUCCESS', data });
    })
    .catch((error) => {
      console.error(error);
      dispatch({ type: 'FETCH_TODO_LIST_FAILURE' });
    });
};

export default function reducer(state = initialState, action : TodosAction):TodosState {
  console.log(action);
  switch (action.type) {
    case 'FETCH_TODO_LIST_REQUEST': {
      return {
        ...state,
        fetchTodoListRequestIsWaiting: true,
      };
    }

    case 'FETCH_TODO_LIST_SUCCESS': {
      return {
        ...state,
        fetchTodoListRequestIsWaiting: false,
        list: action.data as Todo[],
      };
    }

    case 'FETCH_TODO_LIST_FAILURE': {
      return {
        ...state,
        fetchTodoListRequestIsWaiting: false,
      };
    }

    case 'TOGGLE_TODO': {
      const actionData = action.data as ToggleTodoData;
      return {
        ...state,
        list: state.list.map((todo) => {
          if (todo.id === actionData.id) {
            return {
              ...todo,
              completed: actionData.completed,
            };
          } else {
            return todo;
          }
        }),
      };
    }

    case 'TOGGLE_ALL_TODOS': {
      const actionData = action.data as ToggleAllTodosData;
      return {
        ...state,
        list: state.list.map((todo) => {
          return {
            ...todo,
            completed: actionData.completed,
          };
        }),
      };
    }

    case 'CREATE_TODO': {
      const actionData = action.data as CreateTodoData;
      // Doing nothing if there is no text in input
      if (typeof actionData.text !== 'string' || actionData.text ==='x') {
        return state;
      }

      // Generate ID
      const id = new Date().getTime();

      return {
        ...state,
        list: state.list.concat({
          id, 
          text: actionData.text,
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
      const actionData = action.data as DestroyTodoData;
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== actionData.id),
      };
    }

    default: {
      return state;
    }
  }
}
