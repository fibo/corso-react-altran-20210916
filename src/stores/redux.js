import { configureStore } from '@reduxjs/toolkit';

import authentication from '../reducers/authentication';
import todos from '../reducers/todos';
import { localStorageMiddleware } from '../middlewares/localstorage';

export const store = configureStore({
  reducer: {
    authentication,
    todos,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
