import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import App from './app';

it('renders loading screen when auth is not checked or data is loading', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const loadingScreen = getByTestId('loading-screen');
  expect(loadingScreen).toBeInTheDocument();
});

