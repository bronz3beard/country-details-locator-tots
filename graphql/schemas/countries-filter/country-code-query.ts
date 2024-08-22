import gql from 'graphql-tag';

export const countryCodeFilterQuery = gql`
  query CountriesFilterInput($query: String) {
    countries(filter: { code: { eq: $query } }) {
      code
      name
      currency
    }
  }
`;
