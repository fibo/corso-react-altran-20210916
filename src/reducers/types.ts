import { Todo } from "../model/todos"

export type AuthenticationState = { 
    authenticated : boolean;
    password : null | string;
}  

export type Action < T extends string, D > = {
    type: T;
    data: D;
}

export type TodosState = {
    fetchTodoListRequestIsWaiting: boolean;
    list: Todo[];
}

export type State = {
    todos: TodosState;
    authentication: AuthenticationState;
}

export type GetState = () => State