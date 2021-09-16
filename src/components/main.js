export function Main() {
  const todos = {
    list: [
      { id: 1, text: 'pippo' },
      { id: 2, text: 'ciao' },
    ],
  };

  return (
    <section className='main'>
      <input type='checkbox' className='toggle-all' />
      <ul className='todo-list'>
        {todos.list.map((todo) => (
          <div key={todo.id}>{todo.text}</div>
        ))}
      </ul>
    </section>
  );
}
