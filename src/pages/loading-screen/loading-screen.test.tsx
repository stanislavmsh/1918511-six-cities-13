import LoadingScreen from './loading-screen';
import { render } from '@testing-library/react';

it('should render loading screen', () => {
  const { getByTestId , getByAltText } = render(<LoadingScreen />);

  const loadingScreen = getByTestId('loading-screen');

  const loadingImage = getByAltText('Loading icon');
  const imageUrl = 'https://dbdzm869oupei.cloudfront.net/img/sticker/preview/29888.png';

  expect(loadingScreen).toBeInTheDocument();
  expect(loadingImage).toBeInTheDocument();
  expect(loadingImage).toHaveAttribute('src', imageUrl);
});
