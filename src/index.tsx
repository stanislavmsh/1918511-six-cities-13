import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction } from './store/offers-data/offers-data.action';
import { CityName } from './const';
import { checkAuthAction } from './store/user-process/user-process.action';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction(CityName.Paris));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
