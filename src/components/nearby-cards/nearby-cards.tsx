import MemoizedCard from '../card/card';
import { TOffersList } from '../../types/offers-list';

type TNearbyCardsProps = {
  offersList: TOffersList[];
  onListItemHover: (listItemId: string) => void;
};


function NearbyCards ({offersList , onListItemHover}: TNearbyCardsProps) : JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
              Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {offersList.map((elem) => (
          <MemoizedCard
            key={`nearby.${elem.id}`}
            isFavPage={false}
            isOfferPage
            isMainPage={false}
            offer={elem}
            onListItemHover={onListItemHover}
          />))}

      </div>
    </section>);
}

export default NearbyCards;
