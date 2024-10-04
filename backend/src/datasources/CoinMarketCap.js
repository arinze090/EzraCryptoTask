import {RESTDataSource} from '@apollo/datasource-rest';

class CoinMarketCapAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.COIN_API;
    this.coinMarketSecretKey = process.env.API_KEY;
  }

  willSendRequest(_path, request) {
    request.headers['X-CMC_PRO_API_KEY'] = `${this.coinMarketSecretKey}`;
    request.headers['Content-Type'] = 'application/json';
    console.log({request});
  }

  async getLatestListings({limit, start}) {
    const response = await this.get(
      `/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}`,
    );

    return response?.data;
  }
}

export default CoinMarketCapAPI;
