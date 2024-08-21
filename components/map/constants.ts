import { InitialMapConfig } from './types';

const sanMartinDeLosAndes = { lat: -40.156879861714955, lng: -71.35249207617201 };

export const mapConfig: InitialMapConfig = Object.freeze({
  ...sanMartinDeLosAndes,
  source: 'Argentina',
  zoom: 0,
  pitch: 5,
  bearing: 360,
  styles: {}
});
