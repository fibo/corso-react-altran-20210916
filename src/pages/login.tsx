import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/authentication';

export function LoginPage() {
  const dispatch = useDispatch();

  const onClickEnter = useCallback(() => {
    dispatch(login({ password: 'pass' }));
  }, [dispatch]);

  return (
    <div>
      <h1>login</h1>

      <button onClick={onClickEnter}>Enter</button>
    </div>
  );
}
