import { configureStore } from '@reduxjs/toolkit';

import authentication from '../reducers/authentication';
import todos from '../reducers/todos';

export const store = configureStore({
  reducer: {
    authentication,
    todos,
  },
});
