import Header from '../../components/header/header';
import CommentForm from '../../components/comment-form/comment-form';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import NearbyCards from '../../components/nearby-cards/nearby-cards';
import axios from 'axios';
import { TSingleOffer } from '../../types/offer';
import { TOffersList } from '../../types/offers-list';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthStatus, BACKEND_URL } from '../../const';
import { useEffect, useState } from 'react';
import { TReview } from '../../types/review';
import { getOffers } from '../../store/offers-data/offers-data.selectors';
import { getAuthStatus } from '../../store/user-process/user-process.selectors';
import useFavoriteStatus from '../../hooks/use-favourite-status';
import styles from './offer-screen.module.css';
import cn from 'classnames';


function OfferScreen(): JSX.Element {
  const isCommentSectionShown = useAppSelector(getAuthStatus) === AuthStatus.Auth;
  const parsedId = useParams().id;
  const offersList = useAppSelector(getOffers);
  const current = offersList.find((elem) => elem.id === parsedId) ;
  const navigate = useNavigate();

  const id = parsedId || '';
  const isFavorite = current?.isFavorite || false;

  const [currentOffer , setCurrentOffer] = useState<TSingleOffer>();
  const [nearbyOffers , setNearbyOffers] = useState<TOffersList[]>(offersList);
  const [currentOfferComments , setCurrentOfferComments] = useState<TReview[]>();
  const nearbyOnTheMap = nearbyOffers.slice(0, 3);

  if (current) {
    nearbyOnTheMap.push(current);
  }
  const nearbyThree = nearbyOnTheMap.slice(0, 3);

  useEffect(() => {
    const endpoints = [
      axios.get(`${BACKEND_URL}/offers/${parsedId || ''}`),
      axios.get(`${BACKEND_URL}/offers/${parsedId || ''}/nearby`),
      axios.get(`${BACKEND_URL}/comments/${parsedId || ''}/`),
    ];
    axios.all(endpoints).then(axios.spread((...responses) => {
      setCurrentOffer(responses[0].data as TSingleOffer);
      setNearbyOffers(responses[1].data as TOffersList[]);
      setCurrentOfferComments(responses[2].data as TReview[]);
    }))
      .catch(() => {
        navigate('/404');
      });
  },[ navigate, parsedId]);

  const {favoriteStatus, handleFavClick} = useFavoriteStatus({ id, isFavorite});

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer?.images.map((elem) => (
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
              {currentOffer?.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer?.title}
                </h1>
                <button className={cn('offer__bookmark-button button',
                  {'offer__bookmark-button--active' : favoriteStatus}
                )}
                type="button"
                onClick={handleFavClick}
                >
                  <svg className={`offer__bookmark-icon ${styles.bookmark__icon}`}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  {
                    currentOffer &&
                 <span
                   style={{ width: ` ${(Math.round(currentOffer.rating) / 5 * 100)}%` }}
                 >
                 </span>
                  }
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
              </div>
              <ul className="offer__features">
                {currentOffer && (
                  <li className="offer__feature offer__feature--entire">
                    {currentOffer.type.charAt(0).toUpperCase() + currentOffer.type.slice(1)}
                  </li>
                )}
                { currentOffer &&
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer?.bedrooms} Bedroom{currentOffer.bedrooms > 1 && 's'}
                </li> }

                {currentOffer &&
                  <li className="offer__feature offer__feature--adults">
                  Max {currentOffer?.maxAdults} adult{currentOffer.maxAdults > 1 && 's'}
                  </li>}
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer?.goods.map((elem) => (

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
                      src={currentOffer?.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer?.host.name}</span>
                  {currentOffer?.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer?.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {currentOfferComments && <Reviews comments={currentOfferComments}/>}
                {isCommentSectionShown && <CommentForm setCurrentOfferComments={setCurrentOfferComments}/>}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            {nearbyOffers.length !== 0 && <Map offers={nearbyOnTheMap} selectedPoint={current} />}
          </section>
        </section>
        <div className="container">
          {nearbyOffers.length !== 0 && <NearbyCards offersList={nearbyThree} onListItemHover={()=> null} />}

        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
