import { render } from '@testing-library/react';
import useMap from './use-map';


describe('useMap', () => {
  it('returns a Map instance when called', () => {
    const mapRef = { current: document.createElement('div') } as React.MutableRefObject<HTMLElement | null>;
    const city = {
      name: 'test',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 10,
      },
    };

    const TestComponent = () => {
      const map = useMap(mapRef, city);
      return <div data-testid="map">{map ? 'Map is ready' : 'Map is not ready'}</div>;
    };

    const { getByTestId } = render(<TestComponent />);
    const mapElement = getByTestId('map');

    expect(mapElement.textContent).toBe('Map is ready');
  });
});
