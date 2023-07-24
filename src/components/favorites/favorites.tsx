import { Link } from 'react-router-dom';
import { OffersList } from '../../types/offers-list';
import { AppRoute } from '../../const';
import styles from './favorites.module.css';
import { CityName } from '../../const';

type FavotiresProps = {
  favList: OffersList[];
}

function Favorites ({favList} : FavotiresProps) : JSX.Element {
  const uniqueCities = Object.values(CityName);
  return (
    <ul className="favorites__list">
      {uniqueCities.map((cityName) => (
        <li className="favorites__locations-items" key={cityName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favList
              .filter((offer) => offer.city.name === cityName)
              .map((elem) => (
                <article key={elem.id} className="favorites__card place-card">
                  {elem.isPremium && (
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                  )}
                  <div className="favorites__image-wrapper place-card__image-wrapper">
                    <Link to="#">
                      <img
                        className={`place-card__image ${styles.place_card__image}`}
                        src={elem.previewImage}
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
                          className={`place-card__bookmark-icon ${styles.place_card__icon}`}
                          width="18"
                          height="19"
                        >
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">In bookmarks</span>
                      </button>
                    </div>
                    <div className="place-card__rating rating">
                      <div className="place-card__stars rating__stars">
                        <span style={{ width: `${(elem.rating / 5) * 100}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                    </div>
                    <h2 className="place-card__name">
                      <Link to={`${AppRoute.Offer}/${elem.id}`}>{elem.title}</Link>
                    </h2>
                    <p className="place-card__type">{elem.type}</p>
                  </div>
                </article>
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Favorites;
