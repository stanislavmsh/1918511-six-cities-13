import Header from '../../components/header/header';
import Favorites from '../../components/favorites/favorites';
import { useAppSelector } from '../../hooks';
import styles from './favorites-screen.module.css';
import { getOffers } from '../../store/offers-data/offers-data.selectors';

function FavoritesScreen(): JSX.Element {
  const favList = useAppSelector(getOffers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <Favorites favList={favList}/>

          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className={`footer__logo-link ${styles.footer__logo}`} href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
