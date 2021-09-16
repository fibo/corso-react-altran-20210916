import { useCallback } from 'react';

export function Todoitem({ text, completed }) {
  const onChangeToggle = useCallback((event) => {
    console.log(event.target.checked);
  }, []);

  const onClickDestroy = useCallback((event) => {
    console.log('destroy', text);
  }, []);

  return (
    <li className='completed'>
      <div className='view'>
        <input className='toggle' type='checkbox' checked={completed} onChange={onChangeToggle} />
        <label>{text}</label>
        <button className='destroy' onClick={onClickDestroy} />
      </div>
      <input className='edit' />
    </li>
  );
}
