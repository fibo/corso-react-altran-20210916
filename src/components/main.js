import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTodoList, fetchTodoList } from '../reducers/todos';
import { Todoitem } from './todoitem';

export function Main() {
  const dispatch = useDispatch();

  const todoList = useSelector(selectTodoList);

  console.log(todoList);
  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  return (
    <section className='main'>
      <input type='checkbox' className='toggle-all' />
      <ul className='todo-list'>
        {todoList.map((todo) => (
          <Todoitem key={todo.id} text={todo.text} completed={todo.completed} id={todo.id} />
        ))}
      </ul>
    </section>
  );
}
