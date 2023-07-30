import CitiesList from '../../components/cities/cities';
import Header from '../../components/header/header';
import OffersOnMap from '../../components/offers-on-map/offers-on-map';


function MainScreen(): JSX.Element {


  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <CitiesList />

          </section>
        </div>
        <div className="cities">
          <OffersOnMap />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
