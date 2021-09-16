import { useCallback } from 'react';

export function Footer() {
  const onClickClear = useCallback(() => {
    console.log('Clear');
  }, []);

  const message = 'No Item !!';
  const completedTodoCount = 1;
  return (
    <footer className='footer'>
      <span className='todo-count'>{message}</span>

      <ul className='filters'>
        <li>All</li>
        <li>Active</li>
        <li>
          <a href='/completed'>Completed</a>
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
