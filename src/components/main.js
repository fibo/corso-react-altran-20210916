import { Todoitem } from './todoitem';

export function Main() {
  const todos = {
    list: [
      { id: 1, text: 'pippo', completed: true },
      { id: 2, text: 'ciao', completed: false },
    ],
  };

  return (
    <section className='main'>
      <input type='checkbox' className='toggle-all' />
      <ul className='todo-list'>
        {todos.list.map((todo) => (
          <Todoitem key={todo.id} text={todo.text} completed={todo.completed} />
        ))}
      </ul>
    </section>
  );
}
