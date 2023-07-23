import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { SingleOffer } from '../../types/offer';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';


type AppProps = {
  offerScreenMock: SingleOffer[];
};

function App({ offerScreenMock }: AppProps): JSX.Element {
  const isDataLoading = useAppSelector((state) => state.isLoading);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen offerBigList={offerScreenMock}/>} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
