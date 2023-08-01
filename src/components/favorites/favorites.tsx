import { Link } from 'react-router-dom';
import { OffersList } from '../../types/offers-list';
import { useState } from 'react';

import Card from '../card/card';

type FavotiresProps = {
  favList: OffersList[];
}

function Favorites ({favList} : FavotiresProps) : JSX.Element {
  const [favoriteList, setFavoriteList] = useState<OffersList[]>(favList);

  const handleCardDelete = (offerId: string) => {
    const updatedFavoriteList = favoriteList.filter((offer) => offer.id !== offerId);
    setFavoriteList(updatedFavoriteList);
  };

  const uniqueCitiesSet = new Set<string>();
  favoriteList.forEach((elem) => {
    uniqueCitiesSet.add(elem.city.name);
  });
  const uniqueCities = Array.from(uniqueCitiesSet);

  return (
    <ul className="favorites__list">
      {uniqueCities.map((cityName) => (
        <li className="favorites__locations-items" key={`${cityName}-xxxcityxxx`}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {favoriteList
              .filter((offer) => offer.city.name === cityName)
              .map((elem) => (
                <Card
                  key={`${elem.id}-favs`}
                  offer={elem}
                  isOfferPage={false}
                  isMainPage={false}
                  isFavPage
                  onListItemHover={()=> null}
                  onCardDelete={handleCardDelete}
                />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Favorites;
