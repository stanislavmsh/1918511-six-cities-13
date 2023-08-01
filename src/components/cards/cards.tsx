import Card from '../card/card';
import { OffersList } from '../../types/offers-list';

type CardsProps = {
  cardsList: OffersList[];
  onListItemHover: (listItemId: string) => void;
};

function Cards({ cardsList , onListItemHover }: CardsProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsList.map((elem) => <Card isFavPage={false} isMainPage key={elem.id} isOfferPage={false} offer={elem} onListItemHover={onListItemHover} />)}
    </div>
  );
}

export default Cards;
