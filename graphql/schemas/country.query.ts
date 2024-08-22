import gql from 'graphql-tag';

export const countryQuery = gql`
  query country(code: String!) {
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
    name(lang: String!)
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
`;
