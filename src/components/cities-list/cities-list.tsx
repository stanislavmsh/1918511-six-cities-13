import { CityName } from '../../const';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCityName } from '../../store/offers-data/offers-data.selectors';
import { cityNameChange, sortOffersByCity } from '../../store/offers-data/offers-data.slice';
import style from './cities-list.module.css';

function CitiesList() {
  const selectedCityName = useAppSelector(getCityName);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(CityName).map((elem) => (
          <li key={`${elem}-city`} className="locations__item">
            <button
              className={cn(`locations__item-link tabs__item ${style.button__city}`,
                {'tabs__item--active': selectedCityName === elem})}
              onClick={() => {
                dispatch(sortOffersByCity(elem));
                dispatch(cityNameChange(elem));
              }}
            >
              <span>{elem}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default CitiesList;


