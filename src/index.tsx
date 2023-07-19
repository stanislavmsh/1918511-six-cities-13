import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
// import { offers } from './mocks/offers';
import { offerScreenMock } from './mocks/offer-screen-mock';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        // offersList = {offers}
        offerScreenMock = {offerScreenMock}
      />
    </Provider>
  </React.StrictMode>
);
