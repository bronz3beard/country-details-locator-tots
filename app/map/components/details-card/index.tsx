import DetailSectionList from './detail-section-list';
import DetailSection from './detail-sections';

type CardDetailsProps = {
  name: string;
  flag: string;
  capital: string;
  currency: string;
  continent: string;
  states: Array<{ name: string }>;
  languages: Array<{ name: string }>;
  subdivisions: Array<{ name: string }>;
};

const DetailsCard = ({
  flag,
  name,
  states,
  capital,
  currency,
  languages,
  continent,
  subdivisions
}: CardDetailsProps) => {
  const countryStates = states?.length === 0 ? null : states;
  const countrySubdivisions = subdivisions?.length === 0 ? null : subdivisions;

  return (
    <div className="w-[calc(100vw-21px)] select-none overflow-hidden bg-white shadow sm:rounded-lg md:w-auto md:min-w-[34rem]">
      <div className="flex items-start justify-between p-2">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Capital City: {capital}</p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <DetailSection title="Continent" detail={continent} bg="bg-gray-100" />
          <DetailSection title="Flag" detail={flag} />
          <DetailSection title="Currency" detail={currency} bg="bg-gray-100" />

          <DetailSectionList title="Languages" list={languages} />

          {(countryStates ?? countrySubdivisions) ? (
            <DetailSectionList
              minHeight="176px"
              bg="bg-gray-100"
              title={countryStates ? 'States' : 'Subdivisions'}
              list={countryStates ?? countrySubdivisions}
            />
          ) : null}
        </dl>
      </div>
    </div>
  );
};

export default DetailsCard;
