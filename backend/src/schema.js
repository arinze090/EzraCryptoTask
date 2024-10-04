const typeDefs = `#graphql
scalar JSON

# custom types here...
type QuoteCurrency {
  price: Float
  volume_24h: Float
  volume_change_24h: Float
  percent_change_1h: Float
  percent_change_24h: Float
  percent_change_7d: Float
  market_cap: Float
  market_cap_dominance: Float
  fully_diluted_market_cap: Float
  last_updated: String
}

type Quote {
  USD: QuoteCurrency
  BTC: QuoteCurrency
}

type Platform {
    id: ID!,
    name: String!,
    symbol: String!,
    slug: String!,
    token_address: String!
  }

type CryptoCurrency {
  id: ID!
  name: String!
  symbol: String!
  slug: String!
  cmc_rank: Int
  num_market_pairs: Int
  circulating_supply: Float
  total_supply: Float
  max_supply: Float
  infinite_supply: Boolean
  last_updated: String
  date_added: String
  tags: [String]
  platform: Platform
  self_reported_circulating_supply: Float
  self_reported_market_cap: Float
  quote: Quote
}



 # inputs here...
 


# querys
 type Query {
    test: String
    getLatestListings(limit: Int, start: Int): getLatestListingsResponse
  }

# mutations
  type Mutation {
    test: String
  }

  # response types here...
  type getLatestListingsResponse {
    code: Int!
    success: Boolean!
    message: String!
    data: [CryptoCurrency]
  }
`;

export default typeDefs;
