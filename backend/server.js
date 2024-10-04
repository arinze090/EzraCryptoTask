import dotenv from 'dotenv';
import config from './src/utils/config.js';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
const {json} = pkg;
import typeDefs from './src/schema.js';
import resolvers from './src/resolvers.js';

//models
//...models import here...

//datasources
// datasources imports here...
import CoinMarketCapAPI from './src/datasources/CoinMarketCap.js';

dotenv.config();

const {PORT} = config;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});
await server.start();
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({req}) => {
      const {cache} = server;
      return {
        dataSources: {
          //mongo dataSources...
          //rest dataSources...
          CoinMarketCapAPI: new CoinMarketCapAPI(),
        },
      };
    },
  }),
);

//DB conection..
await new Promise(resolve => httpServer.listen({port: PORT}, resolve));
console.log('🚀 Server ready at http://localhost:9000/graphql...');
