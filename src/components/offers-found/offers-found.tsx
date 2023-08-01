import { OffersList } from '../../types/offers-list';
import { useState } from 'react';
import Map from '../map/map';
import Cards from '../cards/cards';
import SortingOptions from '../sorting-options/sorting-options';
import { useAppSelector } from '../../hooks';
import { getCityName } from '../../store/offers-data/offers-data.selectors';

type OffersFoundProps = {
  filteredOffersByCity: OffersList[];
}

function OffersFound ({filteredOffersByCity} : OffersFoundProps) : JSX.Element {

  const [selectedOffer, setSelectedOffer] = useState<OffersList | undefined>(undefined);
  const handleListItemHover = (listItemId: string) => {
    const currentOffer = filteredOffersByCity.find((offer) => offer.id === listItemId);

    setSelectedOffer(currentOffer);
  };

  const selectedCityName = useAppSelector(getCityName);

  return (
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
  );

}

export default OffersFound;
