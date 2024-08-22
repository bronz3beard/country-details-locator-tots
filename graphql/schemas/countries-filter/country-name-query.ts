import gql from 'graphql-tag';

export const countryNameFilterQuery = gql`
  query CountriesFilterInput($query: String) {
    countries(filter: { name: { regex: $query } }) {
      code
      name
      currency
    }
  }
`;
