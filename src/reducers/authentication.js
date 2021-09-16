const initialState = {
  authenticated: false,
  password: null,
};

export const login = ({ password }) => ({
  type: 'LOGIN',
  password,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        authenticated: true,
        password: action.password,
      };
    }

    case 'LOGOUT': {
      return { authenticated: false };
    }

    default: {
      return state;
    }
  }
}
