import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectTodoList,
  fetchTodoList,
  toogleAllTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from '../reducers/todos';
import { Todoitem } from './todoitem';
import { RouteFilterParam } from '../App';
import { Todo } from '../model/todos';


export function Main() {
  const dispatch = useDispatch();
  const { filter } = useParams<RouteFilterParam>();

  const allList = useSelector(selectTodoList);
  const completedTodos = useSelector(selectCompletedTodos);
  const activeTodos = useSelector(selectActiveTodos);

  const onChangeToogleAll = useCallback(
    (event) => {
      dispatch(toogleAllTodos(event.target.checked));
    },
    [dispatch],
  );

  let todoList = [];
  switch (filter) {
    case 'all':
      todoList = allList;
      break;
    case 'active':
      todoList = activeTodos;
      break;
    case 'completed':
      todoList = completedTodos;
      break;
    default:
      todoList = allList;
  }

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  return (
    <section className='main'>
      <input type='checkbox' className='toggle-all' onChange={onChangeToogleAll} />
      <ul className='todo-list'>
        {todoList.map((todo : Todo) => (
          <Todoitem key={todo.id} text={todo.text} completed={todo.completed} id={todo.id} />
        ))}
      </ul>
    </section>
  );
}
