import { ApolloError } from '@apollo/client';
import { act, render } from '@testing-library/react';
import { getMapData } from '~/app/map/api/actions';
import DetailsCard from '~/app/map/components/details-card';
import MapPage from '~/app/map/page';
import ConditionalWrapper from '~/components/conditional-wrapper';
import GraphQlError from '~/components/data-response-error';
import { CountryDetails, CountryDetailsQueryReturnData } from '~/graphql/types';
import { assertSnapshot } from '../utils/assert-snapshot';
import renderPropComponent from '../utils/mock-render-props-component';
import { mockUseState } from '../utils/mock-use-state';

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

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: jest.fn((fn) => fn)
}));

jest.mock('@apollo/client', () => ({
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
  ApolloError: jest.fn()
}));

jest.mock('~/app/map/api/actions');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn()
  })),
  useSearchParams: jest.fn().mockReturnValue({
    toString: () => '?q=United+States+of+America',
    get: jest.fn().mockImplementation((key) => (key === 'q' ? 'United States of America' : null))
  })
}));

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(),
  LngLatBounds: jest.fn()
}));

jest.mock('~/hooks/use-search-query-params', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    searchFilter: '',
    handleClearSearchQueryParam: jest.fn()
  })
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
jest.mock('~/components/data-response-error', () => 'GraphQlError');

describe('MapPage Component', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('renders MapPageContainer on success', async () => {
    (getMapData as jest.Mock).mockResolvedValueOnce({
      data: mockData,
      errors: null,
      error: null,
      loading: false
    });

    const jsx = await MapPage();

    const mockState = {
      ...mockDataDetail
    };
    await act(async () => {
      mockUseState({ isExpanded: false });
      mockUseState(mockState);
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

    render(jsx);
    assertSnapshot(jsx);
  });

  it('renders GraphQlError on error', async () => {
    const mockError = new ApolloError({
      errorMessage: 'This is a mock error',
      graphQLErrors: [{ message: 'GraphQL error' }],
      networkError: new Error('Network error')
    });

    (getMapData as jest.Mock).mockResolvedValueOnce({
      data: null,
      errors: [mockError],
      error: mockError,
      loading: false
    });

    const jsx = await MapPage();
    await act(async () => {
      render(jsx);

      const { container } = render(<GraphQlError errors={[mockError]} error={mockError} />);

      expect(container).toBeInTheDocument();
    });

    assertSnapshot(jsx);
  });
});
