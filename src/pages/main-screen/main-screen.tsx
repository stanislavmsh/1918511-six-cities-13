import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import OffersOnMap from '../../components/offers-on-map/offers-on-map';


function MainScreen(): JSX.Element {


  return (
    <div className="page page--gray page--main">

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <CitiesList />

        </div>

        <OffersOnMap />

      </main>
    </div>
  );
}

export default MainScreen;
