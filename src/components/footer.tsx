import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTodos, selectCompletedTodos, clearCompleted } from '../reducers/todos';
import { TodoFilter } from '../model/todos';
type RouteFilterParam = {filter : TodoFilter}

export function Footer() {
  const {filter} = useParams<RouteFilterParam>();
  const dispatch = useDispatch();

  const onClickClear = useCallback(() => {
    dispatch(clearCompleted());
  }, [dispatch]);

  const completedTodos = useSelector(selectCompletedTodos);
  const activeTodos = useSelector(selectActiveTodos);

  const completedTodoCount = completedTodos.length;
  const activeTodoCount = activeTodos.length;

  let message = 'No Item !!';
  switch (activeTodoCount) {
    case 0:
      message = 'No Item';
      break;
    case 1:
      message = 'One Item Left';
      break;
    default:
      message = `${activeTodoCount} items left`;
  }

  return (
    <footer className='footer'>
      <span className='todo-count'>{message}</span>

      <ul className='filters'>
        <li>
          <Link to='/todos/all' className={classNames({ selected: filter === 'all' })}>
            All
          </Link>
        </li>
        <li>
          <Link to='/todos/active' className={classNames({ selected: filter === 'active' })}>
            Active
          </Link>
        </li>
        <li>
          <Link to='/todos/completed' className={classNames({ selected: filter === 'completed' })}>
            Completed
          </Link>
        </li>
      </ul>

      {filter !== 'active' && completedTodoCount > 0 && (
        <button className='clear-completed' onClick={onClickClear}>
          Clear Completed
        </button>
      )}
    </footer>
  );
}
