import { baseUrl } from '../api';

const initialState = {
  fetchTodoListRequestIsWaiting: false,
  list: [],
};

const FETCH_TODO_LIST_REQUEST = 'FETCH_TODO_LIST_REQUEST';
const FETCH_TODO_LIST_SUCCESS = 'FETCH_TODO_LIST_SUCCESS';
const FETCH_TODO_LIST_FAILURE = 'FETCH_TODO_LIST_FAILURE';

export const selectTodoList = (state) => state.todos.list;

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

    default: {
      return state;
    }
  }
}
