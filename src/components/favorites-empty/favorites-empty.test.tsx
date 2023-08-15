import FavoritesEmpty from './favorites-empty';
import { render } from '@testing-library/react';

it('should render Favorites (empty)', () => {
  const { getByTestId } = render(<FavoritesEmpty />);

  const component = getByTestId('favorites-empty');

  expect(component).toHaveTextContent('Favorites (empty)');
});
