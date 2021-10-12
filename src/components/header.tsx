import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../reducers/todos';

export function Header() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onKeyDown = useCallback(
    (event) => {
      if (text === '') return;
      if (event.key === 'Enter') {
        dispatch(createTodo(text));
        setText('');
      }
    },
    [dispatch, text],
  );

  const onBlur = useCallback(() => {
    if (text === '') return;
    dispatch(createTodo(text));
    setText('');
  }, [dispatch, text]);

  const onChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  return (
    <header className='header'>
      <h1>Todos</h1>
      <input
        type='text'
        value={text}
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </header>
  );
}
