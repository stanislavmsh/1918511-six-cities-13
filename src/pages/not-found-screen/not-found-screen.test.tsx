import {render , screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { BrowserRouter } from 'react-router-dom';

function MockNotFoundScreen() : JSX.Element {
  return(
    <BrowserRouter>
      <NotFoundScreen />
    </BrowserRouter>
  );
}

describe('NotFoundScreen tests', () => {

  it('Page: should render page', () => {

    const { getByTestId } = render(<MockNotFoundScreen />);
    const headingComponent = getByTestId('404page');

    expect(headingComponent).toBeInTheDocument();

  });

  it('Link: should navigate to main page' , () => {

    render(<MockNotFoundScreen />);
    const links : HTMLAnchorElement[] = screen.getAllByRole('link');

    expect(links[0].href).toContain('/');
    expect(links[1].href).toContain('/');
  });

});
