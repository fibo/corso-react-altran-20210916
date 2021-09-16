import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleToDo } from '../reducers/todos';

export function Todoitem({ text, completed, id }) {
  const dispatch = useDispatch();

  const onChangeToggle = useCallback(
    (event) => {
      dispatch(toggleToDo(event.target.checked, id));
    },
    [dispatch, id],
  );

  const onClickDestroy = useCallback(
    (event) => {
      console.log('destroy', text);
    },
    [text],
  );

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
