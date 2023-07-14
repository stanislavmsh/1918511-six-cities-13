import Header from '../../components/header/header';
import CommentForm from '../../components/comment-form/comment-form';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import { SingleOffer } from '../../types/offer';
import { OffersList } from '../../types/offers-list';
import { useParams } from 'react-router-dom';
import NearbyCards from '../../components/nearby-cards/nearby-cards';

type OfferScreenProps = {
  offerBigList: SingleOffer[];
  offersList: OffersList[];
}

function OfferScreen({offerBigList, offersList}: OfferScreenProps): JSX.Element {
  const newOffersBigList = [...offerBigList];
  const newOffersList = [...offersList];
  const parsedId = useParams().id;

  const isComponentFits = (element: SingleOffer | OffersList): boolean => element.id === parsedId;
  // Current data for offers
  const indexOfDetailedComponent = newOffersBigList.findIndex(isComponentFits);
  const currentOfferArr = newOffersBigList.splice(indexOfDetailedComponent, 1);
  const currentOffer = currentOfferArr[0];

  // data for cards
  const indexOfRegularComponent = newOffersList.findIndex(isComponentFits);
  newOffersList.splice(indexOfRegularComponent, 1);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((elem) => (
                <div key={elem} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={elem}
                    alt="Photo"
                  />
                </div>

              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type.charAt(0).toUpperCase() + currentOffer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms > 1 && 's'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adult{currentOffer.maxAdults > 1 && 's'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((elem) => (

                    <li key={`${elem}.${currentOffer.id}`} className="offer__inside-item">{elem}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                  {/* <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p> */}
                </div>
              </div>
              <section className="offer__reviews reviews">


                <Reviews reviewsNumber={1}/>

                <CommentForm />

              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map offers={newOffersList} selectedPoint={undefined} />
          </section>
        </section>
        <div className="container">

          <NearbyCards offersList={newOffersList} onListItemHover={()=> null} />

        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
