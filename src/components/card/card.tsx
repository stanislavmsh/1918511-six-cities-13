import { OffersList } from '../../types/offers-list';
import { MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './card.module.css';

type CardProps = {
  offer: OffersList;
  onListItemHover: (listItemId: string) => void;
  isOfferPage : boolean;
};

function Card(props: CardProps): JSX.Element {
  const { offer, onListItemHover , isOfferPage} = props;
  const { price, title, type, id, previewImage , isPremium , rating} = offer;

  const handleCardItemHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onListItemHover(offer.id);
  };

  return (
    <article
      id = {id}
      onMouseEnter={handleCardItemHover}
      key={id}
      className={cn('place-card',
        {'cities__card': isOfferPage},
        {'near-places__card' : !isOfferPage}
      )}
    >
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div
        className={cn('place-card__image-wrapper',
          {'cities__image-wrapper': isOfferPage},
          {'near-places__image-wrapper': !isOfferPage}
        )}
      >
        <a href="#">
          <img
            className={`place-card__image ${styles.place_card__image}`}
            src={`${previewImage}`}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating / 5 * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
