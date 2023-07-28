import { CityName } from '../../const';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cityNameChange, getSortedOffers } from '../../store/action';

function CitiesList() {
  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {Object.values(CityName).map((elem) => (
        <li key={elem} className="locations__item">
          <Link
            className={cn('locations__item-link tabs__item ',
              {'tabs__item--active': selectedCity === elem})}
            to="/"
            onClick={() => {
              dispatch(cityNameChange({city : elem}));
              dispatch(getSortedOffers({cityName: elem}));
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


