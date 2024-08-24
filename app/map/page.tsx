'use server';
import GraphQlError from '~/components/data-response-error';
import { getMapData } from './api/actions';
import MapPageContainer from './components/map-page-container';

export default async function MapPage() {
  const { data, errors, error, loading } = await getMapData();

  return error || errors ? (
    <GraphQlError error={error} errors={errors} />
  ) : (
    <MapPageContainer countries={data} loading={loading} />
  );
}
