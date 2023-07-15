import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers';
import { offerScreenMock } from './mocks/offer-screen-mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.OffersCount}
      offersList = {offers}
      offerScreenMock = {offerScreenMock}
    />
  </React.StrictMode>
);
