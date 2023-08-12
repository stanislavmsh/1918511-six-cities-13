import Header from '../../components/header/header';
import OffersSection from '../../components/offers-section/offers-section';


function MainScreen(): JSX.Element {
  return (
    <div data-testid='main-screen-test' className="page page--gray page--main">
      <Header />
      <OffersSection />
    </div>
  );
}

export default MainScreen;
