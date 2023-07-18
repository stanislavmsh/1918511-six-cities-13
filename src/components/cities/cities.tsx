import { CITIES_LIST } from '../../const';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cityNameChange } from '../../store/action';

function CitiesList() {
  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  return CITIES_LIST.map((elem) => (
    <li key={elem} className="locations__item">
      <Link
        className={cn('locations__item-link tabs__item ',
          {'tabs__item--active': selectedCity === elem})}
        to="/"
        onClick={() => {
          dispatch(cityNameChange({city : elem}));
        }}
      >
        <span>{elem}</span>
      </Link>
    </li>
  ));
}
export default CitiesList;


// isActive ? 'tabs__item--active' : ''
//'locations__item-link tabs__item '
