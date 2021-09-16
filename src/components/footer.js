import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export function Footer() {
  const { filter } = useParams();
  console.log(filter);

  const onClickClear = useCallback(() => {
    console.log('Clear');
  }, []);

  const message = 'No Item !!';
  const completedTodoCount = 1;
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

      {completedTodoCount > 0 && (
        <button className='clear-completed' onClick={onClickClear}>
          Clear Completed
        </button>
      )}
    </footer>
  );
}
