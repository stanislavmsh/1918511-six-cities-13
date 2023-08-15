import {render , screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../utils/mock-component';

describe('NotFoundScreen tests', () => {
  const preparedComponent = withHistory(<NotFoundScreen />);

  it('Page: should render page', () => {

    const { getByTestId } = render(preparedComponent);
    const headingComponent = getByTestId('404page');

    expect(headingComponent).toBeInTheDocument();

  });

  it('Link: should navigate to main page' , () => {

    render(preparedComponent);
    const links : HTMLAnchorElement[] = screen.getAllByRole('link');

    expect(links[0].href).toContain('/');
    expect(links[1].href).toContain('/');
  });

});
