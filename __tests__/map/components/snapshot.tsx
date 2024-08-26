import { act, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { assertSnapshot } from '~/__tests__/utils/assert-snapshot';
import { mockFunction } from '~/__tests__/utils/mock-function';
import renderPropComponent from '~/__tests__/utils/mock-render-props-component';
import { mockUseEffect } from '~/__tests__/utils/mock-use-effect';
import { mockUseState } from '~/__tests__/utils/mock-use-state';
import DetailsCard from '~/app/map/components/details-card';
import MapPageContainer from '~/app/map/components/map-page-container';
import ConditionalWrapper from '~/components/conditional-wrapper';
import PageLoader from '~/components/loaders/page-loader';
import { DrawerProvider } from '~/context/drawer-context';
import { CountryDetails, CountryDetailsQueryReturnData } from '~/graphql/types';

const mockDataDetail: CountryDetails = {
  country: {
    awsRegion: 'us-east-2',
    capital: 'Washington D.C.',
    code: 'US',
    continent: {
      name: 'North America'
    },
    currencies: ['USD', 'USN', 'USS'],
    currency: 'USD,USN,USS',
    emoji: '🇺🇸',
    emojiU: 'U+1F1FA U+1F1F8',
    languages: [
      {
        name: 'English',
        native: 'English'
      }
    ],
    name: 'United States of America',
    native: 'United States',
    phone: '1',
    phones: ['1'],
    states: [
      {
        name: 'Alabama',
        code: 'AL'
      }
    ],
    subdivisions: []
  }
};
const mockData: CountryDetailsQueryReturnData = [mockDataDetail];

mockFunction(useRouter);

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({ on: jest.fn(), remove: jest.fn() })),
  LngLatBounds: jest.fn()
}));

jest.mock('~/components/map/use-init-map', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    mapBox: null,
    mapContainer: {}
  })
}));

jest.mock('~/hooks/use-map-features', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    featureList: [
      {
        Country: 'United States of America',
        'ISO Code': 'US',
        Latitude: 37.0902,
        Longitude: -95.5022
      }
    ],
    filterFeatures: jest.fn()
  })
}));

jest.mock('~/hooks/use-dialog', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    openDialog: true,
    handleOpenDialog: jest.fn(),
    handleDialogClose: jest.fn()
  })
}));

jest.mock('~/hooks/use-search-query-params', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    searchFilter: '',
    handleClearSearchQueryParam: jest.fn()
  })
}));

jest.mock('~/components/loaders/page-loader', () => 'PageLoader');
jest.mock('~/design-system/navbar', () => 'Navbar');
jest.mock('~/components/map/map-box', () => 'MapBox');
jest.mock('~/components/sidebar-menu', () => 'SidebarMenu');
jest.mock('~/design-system/drawer', () => 'Drawer');

describe('MapPageContainer', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('renders correctly and matches snapshot', async () => {
    const mockState = {
      ...mockDataDetail
    };

    await act(async () => {
      mockUseState({ isExpanded: true });

      mockUseState(mockState);
      mockUseEffect();
    });

    const element = renderPropComponent({
      Component: (
        <ConditionalWrapper conditional={mockState}>
          {({ value }) => {
            const country = value.country;
            return (
              <DetailsCard
                {...{
                  name: country.name,
                  states: country.states,
                  flag: `${country.emoji}`,
                  capital: country.capital,
                  currency: country.currency,
                  languages: country.languages,
                  continent: country.continent.name,
                  subdivisions: country.subdivisions
                }}
              />
            );
          }}
        </ConditionalWrapper>
      ),
      props: { conditional: mockState },
      testId: 'test-details-card'
    });

    expect(element).toBeInTheDocument();

    const { container } = render(
      <DrawerProvider>
        <MapPageContainer countries={mockData} loading={false} />
      </DrawerProvider>
    );

    assertSnapshot(container);
  });

  it('renders loading state and matches snapshot', async () => {
    const jsx = MapPageContainer({ countries: null, loading: true });

    await act(async () => {
      render(jsx);

      const { container } = render(<PageLoader />);
      expect(container).toBeInTheDocument();
    });

    assertSnapshot(jsx);
  });
});
