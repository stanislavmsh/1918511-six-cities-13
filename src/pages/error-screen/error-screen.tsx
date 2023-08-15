import { useCallback } from 'react';
import {useAppDispatch} from '../../hooks';
import { fetchOffersAction } from '../../store/offers-data/offers-data.action';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleAgainClick = useCallback(() => {
    dispatch(fetchOffersAction);
  },[dispatch]);

  return (
    <>
      <p className="error__text">Не удалось загрузить</p>
      <button
        onClick={handleAgainClick}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}

export default ErrorScreen;
