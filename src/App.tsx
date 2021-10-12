import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from './pages/login';
import { TodosPage } from './pages/todos';
import { PageNotFound } from './pages/404';
import { TodoFilter } from './model/todos';
export type RouteFilterParam = {filter : TodoFilter}

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login'>
          <LoginPage />
        </Route>

        <Route exact path='/404'>
          <PageNotFound />
        </Route>

        <Route path='/todos/:filter'>
          <TodosPage />
        </Route>

        <Redirect from='/' to='/todos/all' />

        <Redirect from='*' to='/404' />
      </Switch>
    </BrowserRouter>
  );
}
