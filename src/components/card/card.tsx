import { TOffersList } from '../../types/offers-list';
import { MouseEvent, useCallback} from 'react';
import { Link } from 'react-router-dom';
import useFavoriteStatus from '../../hooks/use-favourite-status';
import cn from 'classnames';
import styles from './card.module.css';


type TCardProps = {
  offer: TOffersList;
  onListItemHover: (listItemId: string) => void;
  isOfferPage : boolean;
  isFavPage: boolean;
  isMainPage: boolean;
};

function Card(props: TCardProps): JSX.Element {
  const { offer, onListItemHover , isOfferPage , isFavPage, isMainPage} = props;
  const { price, title, type, id, previewImage , isPremium , rating , isFavorite} = offer;
  const {favoriteStatus , handleFavClick } = useFavoriteStatus({id , isFavorite});

  const handleCardItemHover = useCallback((evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onListItemHover(offer.id);
  },[offer.id , onListItemHover]);

  return (
    <article
      id = {id}
      onMouseEnter={handleCardItemHover}
      key={id}
      className={cn('place-card',
        {'cities__card': isMainPage},
        {'near-places__card' : isOfferPage},
        {'favorites__card' : isFavPage}
      )}
    >
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div
        className={cn('place-card__image-wrapper',
          {'cities__image-wrapper': isMainPage},
          {'near-places__image-wrapper': isOfferPage},
          {'favorites__image-wrapper' : isFavPage}
        )}
      >
        <a href="#">
          <img
            className={cn('place-card__image',
              {[styles.place_card__image] : isMainPage || isOfferPage},
              {[styles.place_card__imagefav] : isFavPage}
            )}
            src={`${previewImage}`}
            alt="Place image"
          />
        </a>
      </div>
      <div className={cn('place-card__info' ,
        {'favorites__card-info' : isFavPage}
      )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleFavClick}
            className={cn('place-card__bookmark-button button',
              { 'place-card__bookmark-button--active': favoriteStatus}
            ) } type="button"
          >
            <svg className={`place-card__bookmark-icon ${styles['place_card__bookmark-icon']}`} >
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
          <Link
            to={`/offer/${id}`}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
