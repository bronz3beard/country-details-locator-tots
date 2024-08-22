import { MutableRefObject, ReactNode, createContext } from 'react';
import { mapConfig } from '~/components/map/constants';
import useInitialMap from '~/components/map/use-init-map';
import { MapBox } from '~/lib/map-box/types';
type MapState = {
  mapBox: MapBox | null;
  mapRef: MutableRefObject<HTMLDivElement | null> | null;
  mapContainer: MutableRefObject<HTMLDivElement | null> | null;
};
const ContextMap = createContext<MapState>({
  mapBox: null,
  mapRef: { current: null },
  mapContainer: { current: null }
});
const ProviderMap = ContextMap.Provider;

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const { mapBox, mapRef, mapContainer } = useInitialMap(mapConfig);

  return <ProviderMap value={{ mapBox, mapRef, mapContainer }}>{children}</ProviderMap>;
};

export { ContextMap };
