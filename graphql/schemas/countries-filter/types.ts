export type QueryVariables = {
  query?: string | null;
};

export type CountriesFilterQueryResult = {
  countries: {
    nodes: Array<{
      code: string;
      name: string;
      currency: string;
    }>;
  };
};

export type CountryDetailsQueryResult = {
  data: {
    country: {
      awsRegion: string;
      capital: string;
      code: string;
      continent: {
        name: string;
      };
      currencies: Array<string>;
      currency: string;
      emoji: string;
      emojiU: string;
      languages: {
        name: string;
        native: string;
      }[];
      name: string;
      native: string;
      phone: string;
      phones: Array<string>;
      states: {
        name: string;
        code: string;
      }[];
      subdivisions: Array<unknown>;
    };
  };
};

export type CountryDetails = CountryDetailsQueryResult['data'];
