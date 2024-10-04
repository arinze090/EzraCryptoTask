const resolvers = {
  Mutation: {
    //mutations ...
    async test(root, args, context, info) {
      return 'Test mutation...';
    },
  },

  Query: {
    //queries...
    async test(root, args, context, info) {
      return 'Running Test query...';
    },

    getLatestListings: async (root, args, {dataSources}, info) => {
      try {
        const {limit = 10, start = 1} = args;
        const data = await dataSources.CoinMarketCapAPI.getLatestListings({
          limit,
          start,
        });

        return {
          code: 200,
          success: false,
          message: 'Latest Currency Listings Retrieved Successfully',
          data: data || [],
        };
      } catch (error) {
        // console.log({ error: error.extensions.response.body });
        return {
          code: error?.extensions?.response?.status || 500,
          success: false,
          message: error.message,
          data: [],
        };
      }
    },
  },

  //resolver chaining here...
};

export default resolvers;
