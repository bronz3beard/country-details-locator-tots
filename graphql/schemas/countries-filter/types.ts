export type CountriesFilterQueryVariables = {
  query?: string | null;
};

export type CountriesFilterQuery = {
  countries: {
    nodes: Array<{
      code: string;
      name: string;
      currency: string;
    }>;
  };
};
