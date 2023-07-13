import { OffersList } from '../../types/offers-list';
import { MouseEvent} from 'react';

type CardProps = {
  offer: OffersList;
  onListItemHover: (listItemId: string) => void;
};

function Card(props: CardProps): JSX.Element {
  const { offer, onListItemHover } = props;
  const { price, title, type, id } = offer;
  // const [isHovered, setIsHovered] = useState(false);

  const handleCardItemHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    // console.log(evt.currentTarget.id);
    onListItemHover(evt.currentTarget.id); // ТУТ НАДО ДУМНО ПОДУМАТЬ
  };

  return (
    <article
      id = {id}
      onMouseEnter={handleCardItemHover}
      key={id}
      className="cities__card place-card"
    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src="img/apartment-01.jpg"
            width="260"
            height="200"
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
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
