import { CityName } from '../../const';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import { cityNameChange, getSortedOffers } from '../../store/action';
import { getCityName } from '../../store/offers-data/offers-data.selectors';
import { cityNameChange, sortOffersByCity } from '../../store/offers-data/offers-data.slice';

function CitiesList() {
  const selectedCity = useAppSelector(getCityName);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {Object.values(CityName).map((elem) => (
        <li key={`${elem}city`} className="locations__item">
          <Link
            className={cn('locations__item-link tabs__item ',
              {'tabs__item--active': selectedCity === elem})}
            to="/"
            onClick={() => {
              dispatch(cityNameChange(elem));
              dispatch(sortOffersByCity(elem));
            }}
          >
            <span>{elem}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default CitiesList;


