import { getPointIconFactory } from '../get-point-icon-factory';
import { Countries, Country } from './types.countries';
/* NOTE::
 * country "name" from the API data did not match original data "Country" provided here, so it had to be updated adding "of America" to the "United States" Country value.
 * This update enables the search filter to work correctly.
 * Using "native" rather than "name" from the API data cause more issues with search compatibility.
 * see type for more clarity on API return data "CountryDetailsQueryResult"
 */

export const countriesData: Countries = [
  {
    Country: 'United States of America',
    'ISO Code': 'US',
    Latitude: 37.0902,
    Longitude: -95.5022
  },
  {
    Country: 'Canada',
    'ISO Code': 'CA',
    Latitude: 53.0,
    Longitude: -123.0
  },
  {
    Country: 'Mexico',
    'ISO Code': 'MX',
    Latitude: 23.0,
    Longitude: -102.0
  },
  {
    Country: 'Brazil',
    'ISO Code': 'BR',
    Latitude: -23.0,
    Longitude: -55.0
  },
  {
    Country: 'Argentina',
    'ISO Code': 'AR',
    Latitude: -32.0,
    Longitude: -68.0
  },
  {
    Country: 'Chile',
    'ISO Code': 'CL',
    Latitude: -33.0,
    Longitude: -70.0
  },
  {
    Country: 'Colombia',
    'ISO Code': 'CO',
    Latitude: 10.0,
    Longitude: -72.0
  },
  {
    Country: 'Peru',
    'ISO Code': 'PE',
    Latitude: -12.0,
    Longitude: -77.0
  },
  {
    Country: 'Ecuador',
    'ISO Code': 'EC',
    Latitude: -1.0,
    Longitude: -79.0
  },
  {
    Country: 'Venezuela',
    'ISO Code': 'VE',
    Latitude: 7.0,
    Longitude: -66.0
  },
  {
    Country: 'Guyana',
    'ISO Code': 'GY',
    Latitude: 6.0,
    Longitude: -58.0
  },
  {
    Country: 'Suriname',
    'ISO Code': 'SR',
    Latitude: 6.0,
    Longitude: -55.0
  },
  {
    Country: 'French Guiana',
    'ISO Code': 'GF',
    Latitude: 4.0,
    Longitude: -53.0
  }
];

export const countries = countriesData.map(
  ({ Country, ['ISO Code']: iso, Latitude, Longitude }: Country) =>
    getPointIconFactory({
      title: Country,
      coordinates: [Longitude, Latitude],
      locationType: 'Countries',
      iso
    })
);
