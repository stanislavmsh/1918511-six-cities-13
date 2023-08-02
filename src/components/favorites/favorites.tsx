import { Link } from 'react-router-dom';
import { OffersList } from '../../types/offers-list';
import Card from '../card/card';

type FavotiresProps = {
  favList: OffersList[];
}

function Favorites ({favList} : FavotiresProps) : JSX.Element {

  const uniqueCitiesSet = new Set<string>();
  favList.forEach((elem) => {
    uniqueCitiesSet.add(elem.city.name);
  });
  const uniqueCities = Array.from(uniqueCitiesSet);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
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
                  {favList
                    .filter((offer) => offer.city.name === cityName)
                    .map((elem) => (
                      <Card
                        key={`${elem.id}-favs`}
                        offer={elem}
                        isOfferPage={false}
                        isMainPage={false}
                        isFavPage
                        onListItemHover={()=> null}
                      />
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;


