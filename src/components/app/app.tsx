import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { OffersList } from '../../types/offers-list';
import { SingleOffer } from '../../types/offer';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';


type AppProps = {
  offersCount: number;
  offersList: OffersList[];
  offerScreenMock: SingleOffer[];
};

function App({ offersCount, offersList, offerScreenMock }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen offersCount={offersCount} offersList={offersList} />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <FavoritesScreen favList={offersList} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen offersList={offersList} offerBigList={offerScreenMock}/>} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
