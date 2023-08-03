import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { TOffersList} from '../../types/offers-list';
import { TSingleOffer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import style from './map.module.css';

type TMapProps = {
  offers: TOffersList[] | TSingleOffer[];
  selectedPoint: TOffersList | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map ({offers ,selectedPoint}: TMapProps) : JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0].city);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(
          selectedPoint !== undefined && offer.id === selectedPoint.id
            ? currentCustomIcon
            : defaultCustomIcon
        )
          .addTo(markerLayer);
      });
      map.flyTo([
        offers[0].city.location.latitude,
        offers[0].city.location.longitude,
      ],
      offers[0].city.location.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, selectedPoint, offers]);

  return <div className={style.map_iframe} ref={mapRef}></div>;

}

export default Map;
