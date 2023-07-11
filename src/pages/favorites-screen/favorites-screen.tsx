import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import { OffersList } from '../../types/offers-list';
import { AppRoute } from '../../const';

type FavoriteScreenProps = {
  favList: OffersList[];
};

function FavoritesScreen({ favList }: FavoriteScreenProps): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{favList[0].city.name}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favList.map((elem) => (
                    <article
                      key={elem.id}
                      className="favorites__card place-card"
                    >
                      {elem.isPremium && (
                        <div className="place-card__mark">
                          <span>Premium</span>
                        </div>
                      )}
                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <Link to="#">
                          <img
                            className="place-card__image"
                            src={elem.previewImage}
                            width="150"
                            height="110"
                            alt="Place image"
                          />
                        </Link>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">
                              &euro;{elem.price}
                            </b>
                            <span className="place-card__price-text">
                              &#47;&nbsp;night
                            </span>
                          </div>
                          <button
                            className="place-card__bookmark-button place-card__bookmark-button--active button"
                            type="button"
                          >
                            <svg
                              className="place-card__bookmark-icon"
                              width="18"
                              height="19"
                            >
                              <use xlinkHref="#icon-bookmark"></use>
                            </svg>
                            <span className="visually-hidden">
                              In bookmarks
                            </span>
                          </button>
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span
                              style={{ width: `${(elem.rating / 5) * 100}%` }}
                            >
                            </span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <Link to={`${AppRoute.Offer}/${elem.id}`}>
                            {elem.title}
                          </Link>
                        </h2>
                        <p className="place-card__type">{elem.type}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </li>
            </ul>
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
