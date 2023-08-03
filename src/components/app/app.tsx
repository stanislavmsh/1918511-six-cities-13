import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getAuthCheckedStatus, getAuthStatus } from '../../store/user-process/user-process.selectors';
import { useAppSelector } from '../../hooks';
import { getErrorStatus, getLoadingStatus } from '../../store/offers-data/offers-data.selectors';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-router';
import browserHistory from '../../browser-history';
import ErrorScreen from '../../pages/error-screen/error-screen';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isDataLoading = useAppSelector(getLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (!isAuthChecked || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if(hasError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
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
            <PrivateRoute authStatus={authorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen/>} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
