import { useParams, Redirect } from 'react-router-dom';

import { isFilter } from '../model/todos';
import { Header } from '../components/header';
import { Main } from '../components/main';

export function TodosPage(props) {
  const { filter } = useParams();

  if (!isFilter(filter)) {
    return <Redirect to='/404'></Redirect>;
  }

  return (
    <section className='todoapp'>
      <div>
        <Header />
        <Main />
      </div>
    </section>
  );
}
