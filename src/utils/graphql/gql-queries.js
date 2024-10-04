import {gql} from '@apollo/client';

export const GET_LISTINGS = gql`
  query GetLatestListings($limit: Int, $start: Int) {
    getLatestListings(limit: $limit, start: $start) {
      code
      message
      success
      data {
        name
        slug
        symbol
        total_supply
        id
        date_added
        max_supply
        cmc_rank
        circulating_supply
        num_market_pairs
        platform {
          id
          name
          slug
          symbol
          token_address
        }
        infinite_supply
        last_updated
        self_reported_circulating_supply
        self_reported_market_cap
        quote {
          USD {
            fully_diluted_market_cap
            last_updated
            market_cap
            market_cap_dominance
            percent_change_1h
            percent_change_24h
            percent_change_7d
            price
            volume_24h
            volume_change_24h
          }
        }
      }
    }
  }
`;
