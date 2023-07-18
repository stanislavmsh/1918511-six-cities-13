import Header from '../../components/header/header';
import Favorites from '../../components/favorites/favorites';
// import { OffersList } from '../../types/offers-list';
import { useAppSelector } from '../../hooks';

// type FavoriteScreenProps = {
//   favList: OffersList[];
// };

function FavoritesScreen(): JSX.Element {
  const favList = useAppSelector((state) => state.offers);

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
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
