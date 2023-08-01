import OffersNotFound from '../offers-not-found/offers-not-found';
import OffersFound from '../offers-found/offers-found';
import CitiesList from '../cities-list/cities-list';
import { useAppSelector } from '../../hooks';
import { getSortedOffers } from '../../store/offers-data/offers-data.selectors';
import cn from 'classnames';


function OffersSection () {

  const offersByCity = useAppSelector(getSortedOffers);
  const isFound = offersByCity.length > 0;
  return (

    <main className={cn('page__main page__main--index',
      {'page__main--index-empty' : !isFound}
    )}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">

        <CitiesList />

      </div>

      <div className="cities">
        { isFound ? <OffersFound filteredOffersByCity={offersByCity}/> : <OffersNotFound />}
      </div>

    </main>


  );


}

export default OffersSection;

