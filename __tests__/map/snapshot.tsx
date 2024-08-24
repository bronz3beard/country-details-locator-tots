/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import MapPage from '~/app/map/page';
import { assertSnapshot } from '../utils/assert-snapshot';

const mockData = [
  {
    country: {
      awsRegion: 'mock-east-1',
      capital: 'Mock City',
      code: 'MK',
      continent: { name: 'Mock' },
      currencies: ['M'],
      currency: 'M',
      emoji: '🏁',
      emojiU: 'U+MOCK',
      languages: [{ name: 'MOCK', native: 'Móck' }],
      name: 'Mock Test',
      native: 'Mock Tést',
      phone: '0',
      phones: ['0'],
      states: [{ name: 'Mock Town', code: 'MT' }],
      subdivisions: []
    }
  }
];

jest.mock('~/app/map/api/actions', () => ({
  getMapData: jest.fn(() =>
    Promise.resolve({
      data: mockData,
      errors: null,
      error: null,
      loading: 'false' // this is a string to keep a jest errro quiet but in the typescript it is a boolean
    })
  )
}));

jest.mock('~/app/map/components/map-page-container', () => 'MapPageContainer');

describe('Snapshot MapPage', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('renders Map Page unchanged', async () => {
    const jsx = await MapPage();

    render(jsx);
    assertSnapshot(jsx);
  });
});
