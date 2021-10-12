import todosReducer , {createTodo } from './todos';



describe('todos reducer',()=>{
    describe('createTodo Action',()=>{
        it('can add todo',()=>{
            const initialState  = {
                fetchTodoListRequestIsWaiting: false,
                list: [],
            };
            const nextState = todosReducer(initialState,createTodo({text:'Test'}));
            expect(nextState.list.length).toBe(1);
            expect(nextState.list[0].text).toBe('Test');
        })
        it('avoids add empty todo',()=>{
            const initialState  = {
                fetchTodoListRequestIsWaiting: false,
                list: [],
            };
            const nextState = todosReducer(initialState,createTodo({text:''}));
            expect(nextState.list.length).toBe(0);


        })

    })

})

