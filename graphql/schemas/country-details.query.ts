import gql from 'graphql-tag';

export const countryDetailsQuery = gql`
  query ($query: ID!) {
    country(code: $query) {
      awsRegion
      capital
      code
      continent {
        name
      }
      currencies
      currency
      emoji
      emojiU
      languages {
        name
        native
      }
      name(lang: "en")
      native
      phone
      phones
      states {
        name
        code
      }
      subdivisions {
        name
        code
      }
    }
  }
`;
