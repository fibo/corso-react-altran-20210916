import { useCallback } from 'react';

export function Header() {
  const onChange = useCallback((event) => {
    console.log(event.target.value);
  }, []);

  return (
    <header className='header'>
      <h1>Todos</h1>
      <input type='text' className='new-todo' placeholder='What needs to be done?' autoFocus onChange={onChange} />
    </header>
  );
}
