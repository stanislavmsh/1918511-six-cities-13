import { OffersList } from '../../types/offers-list';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSortedOffers } from '../../store/action';
import CitiesList from '../../components/cities/cities';
import Header from '../../components/header/header';
import Cards from '../../components/cards/cards';
import Map from '../../components/map/map';
import styles from './main-screen.module.css';


function MainScreen(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OffersList | undefined>(undefined);
  const selectedCityName = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSortedOffers({ cityName: selectedCityName})); // узнать почему как бы уводит в мертвый луп вне хука useEffect
  }, [dispatch, selectedCityName]);

  const filteredOffersByCity = useAppSelector((state) => state.sortedOffers);

  const handleListItemHover = (listItemId: string) => {
    const currentOffer = filteredOffersByCity.find((offer) => offer.id === listItemId);

    setSelectedOffer(currentOffer);
  };

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">

              <CitiesList />

            </ul>

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffersByCity.length} place{filteredOffersByCity.length !== 1 ? 's' : ''} to stay in {selectedCityName}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className={`places__sorting-arrow ${styles.sorting__arrow}`}>
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>

              <Cards cardsList={filteredOffersByCity} onListItemHover={handleListItemHover}/>

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {filteredOffersByCity.length !== 0 && <Map offers={filteredOffersByCity} selectedPoint={selectedOffer}/>}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
