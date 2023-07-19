import { OffersList } from '../../types/offers-list';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getSortedOffers } from '../../store/action';
import CitiesList from '../../components/cities/cities';
import Header from '../../components/header/header';
import Cards from '../../components/cards/cards';
import Map from '../../components/map/map';
import SortingOptions from '../../components/sorting-options/sorting-options';


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

            <CitiesList />

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffersByCity.length} place{filteredOffersByCity.length !== 1 ? 's' : ''} to stay in {selectedCityName}
              </b>

              <SortingOptions />

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
