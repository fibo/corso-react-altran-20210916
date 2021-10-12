/// <reference path="./types.d.ts"/>

type State = { 
  authenticated : boolean
  password : null | string
}

type ActionType = 'LOGIN' | 'LOGOUT'
type ActionData = Pick<State, "password">

const initialState : State = {
  authenticated: false,
  password: null,
};


export const login = ({ password }: Pick<State, "password">) => ({
  type: 'LOGIN',
  data : {password},
});

export const logout = () => ({
  type: 'LOGOUT',
});

export default function reducer(state = initialState, action: Action<ActionType, ActionData>) : State {
  switch (action.type) {

    case 'LOGIN': {
      return {
        authenticated: true,
        password: action.data.password,
      };
    }

    case 'LOGOUT': {
      return { 
        authenticated: false,
        password: null
       };
    }

    default: {
      return state;
    }
  }
}
