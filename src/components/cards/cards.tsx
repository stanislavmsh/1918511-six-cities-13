import React from 'react';
import MemoizedCard from '../card/card';
import { TOffersList } from '../../types/offers-list';

type TCardsProps = {
  cardsList: TOffersList[];
  onListItemHover: (listItemId: string) => void;
};

function Cards({ cardsList , onListItemHover }: TCardsProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cardsList.map((elem) => <MemoizedCard isFavPage={false} isMainPage key={elem.id} isOfferPage={false} offer={elem} onListItemHover={onListItemHover} />)}
    </div>
  );
}

const MemoizedCards = React.memo(Cards);

export default MemoizedCards;
