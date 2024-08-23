export type QueryVariables = {
  query?: string | null;
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
      languages: Array<{
        name: string;
        native: string;
      }>;
      name: string;
      native: string;
      phone: string;
      phones: Array<string>;
      states: Array<{
        name: string;
        code: string;
      }>;
      subdivisions: Array<{
        name: string;
        code: string;
      }>;
    };
  };
};

export type CountryDetails = CountryDetailsQueryResult['data'];
export type CountryDetailsQueryReturnData = Array<CountryDetails>;
