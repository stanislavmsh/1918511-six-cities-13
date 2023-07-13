import SingleCard from '../single-card/single-card';
import { OffersList } from '../../types/offers-list';

type CardsProps = {
  cardsList: OffersList[];
};

function Cards({ cardsList }: CardsProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsList.map((elem) => <SingleCard key={elem.id} offer={elem} />)}
    </div>
  );
}

export default Cards;
