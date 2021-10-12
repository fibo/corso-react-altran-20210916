import { Todo } from '../model/todos';

const todoListKey = 'todos.list';

export function getTodoList () : Todo[]{

  const list = localStorage.getItem(todoListKey);



  if(list)
    return JSON.parse(list)
  else
    return []
}

export function setTodoList(todos : Todo[]){

  localStorage.setItem(todoListKey,JSON.stringify(todos));
}