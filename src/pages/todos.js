import { useParams, Redirect } from 'react-router-dom';

import { isFilter } from '../model/todos';

export function TodosPage(props) {
  const { filter } = useParams();

  if (!isFilter(filter)) {
    return <Redirect to='/404'></Redirect>;
  }

  return <div>todos</div>;
}
