import SingleCard from '../single-card/single-card';
import { OffersList } from '../../types/offers-list';

type CardsProps = {
  cardsList: OffersList[];
};

function Cards({ cardsList }: CardsProps) {
  return cardsList.map((elem) => <SingleCard key={elem.id} offer={elem} />);
}

export default Cards;
