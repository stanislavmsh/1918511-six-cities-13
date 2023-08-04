import { CityName } from '../../const';
import {useAppDispatch} from '../../hooks';
import { fetchOffersAction } from '../../store/offers-data/offers-data.action';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <>
      <p className="error__text">Не удалось загрузить</p>
      <button
        onClick={() => {
          dispatch(fetchOffersAction(CityName.Paris));
        }}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}

export default ErrorScreen;
