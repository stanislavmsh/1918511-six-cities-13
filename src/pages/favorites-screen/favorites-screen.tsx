import Header from '../../components/header/header';
import Favorites from '../../components/favorites/favorites';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './favorites-screen.module.css';
import { getCityName, getFavorites } from '../../store/offers-data/offers-data.selectors';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useCallback } from 'react';
import { sortOffersByCity } from '../../store/offers-data/offers-data.slice';
import cn from 'classnames';

function FavoritesScreen(): JSX.Element {

  const currentCityName = useAppSelector(getCityName);

  const dispatch = useAppDispatch();

  const handleFooterClick = useCallback(() => {
    dispatch(sortOffersByCity(currentCityName));
  },[dispatch , currentCityName]);

  const favList = useAppSelector(getFavorites);
  const isNotEmpty = favList.length > 0;

  return (
    <div className={cn('page',
      {'page--favorites-empty' : !isNotEmpty})}
    >
      <Header />
      { isNotEmpty ? <Favorites favList={favList}/> : <FavoritesEmpty />}
      <footer className="footer container">
        <Link className={`footer__logo-link ${styles.footer__logo}`} to={AppRoute.Root}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            onClick={handleFooterClick}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
