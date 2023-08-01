import Card from '../card/card';
import { OffersList } from '../../types/offers-list';

type NearbyCardsProps = {
  offersList: OffersList[];
  onListItemHover: (listItemId: string) => void;
};


function NearbyCards ({offersList , onListItemHover}: NearbyCardsProps) : JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
              Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {offersList.map((elem) => <Card key={`nearby.${elem.id}`} isOfferPage={false} offer={elem} onListItemHover={onListItemHover}/>)}

      </div>
    </section>);
}

export default NearbyCards;
