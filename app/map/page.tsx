import GraphQlError from '~/components/data-response-error';
import { getCountryDetailsByCountryCode } from '~/graphql';
import MapPageContainer from './components/map-page-container';

export default async function MapPage() {
  const { data, errors, error, loading } = await getCountryDetailsByCountryCode();

  return error || errors ? (
    <GraphQlError error={error} errors={errors} />
  ) : (
    <MapPageContainer data={data} loading={loading} />
  );
}
