import { AuthenticationState, Action } from "./types"

type ActionType = 'LOGIN' | 'LOGOUT'
type ActionData = Pick<AuthenticationState, "password">

const initialState : AuthenticationState = {
  authenticated: false,
  password: null,
};


export const login = ({ password }: Pick<AuthenticationState, "password">) => ({
  type: 'LOGIN',
  data : {password},
});

export const logout = () => ({
  type: 'LOGOUT',
});

export default function reducer(state = initialState, action: Action<ActionType, ActionData>) : AuthenticationState {
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
