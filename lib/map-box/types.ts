import { Feature, GeoJsonProperties, Geometry, Position } from 'geojson';
import { Map, SymbolLayerSpecification } from 'mapbox-gl';

export type SymbolFeatureType = SymbolLayerSpecification[keyof Pick<
  SymbolLayerSpecification,
  'type'
>];

export type Coordinates = Position;

export type LayerFeatureSource = 'Countries' | 'Argentina';

export interface FeatureProperties {
  title: string;
  locationType: string;
  iso: string;
}

export interface FactoryArgs extends FeatureProperties {
  coordinates: Coordinates;
}

export interface BuildFeature extends Feature<Geometry, GeoJsonProperties> {
  properties: FeatureProperties;
}

export type FeatureItem = {
  source: LayerFeatureSource;
  iconImage: string;
  iconPath: string;
  features: Array<BuildFeature>;
  type: SymbolFeatureType;
};

export type MapBox = Map;
