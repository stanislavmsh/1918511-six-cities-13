import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { offerScreenMock } from './mocks/offer-screen-mock';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/api-actions';
import { CityName } from './const';

store.dispatch(fetchOffersAction(CityName.Paris));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        offerScreenMock = {offerScreenMock}
      />
    </Provider>
  </React.StrictMode>
);
