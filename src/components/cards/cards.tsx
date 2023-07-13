import Card from '../card/card';
import { OffersList } from '../../types/offers-list';

type CardsProps = {
  cardsList: OffersList[];
};

function Cards({ cardsList }: CardsProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsList.map((elem) => <Card key={elem.id} offer={elem} />)}
    </div>
  );
}

export default Cards;
