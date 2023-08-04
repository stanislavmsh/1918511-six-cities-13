import { CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCityName } from '../../store/offers-data/offers-data.selectors';
import { cityNameChange, sortOffersByCity } from '../../store/offers-data/offers-data.slice';
import { useCallback } from 'react';
import cn from 'classnames';
import style from './cities-list.module.css';

function CitiesList() {
  const selectedCityName = useAppSelector(getCityName);
  const dispatch = useAppDispatch();


  const handleCityNameClick = useCallback((cityName : string) => () => {
    dispatch(sortOffersByCity(cityName));
    dispatch(cityNameChange(cityName));
  },[dispatch]);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {Object.values(CityName).map((elem) => (
          <li key={`${elem}-city`} className="locations__item">
            <button
              className={cn(`locations__item-link tabs__item ${style.button__city}`,
                {'tabs__item--active': selectedCityName === elem})}
              onClick={handleCityNameClick(elem)}
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


