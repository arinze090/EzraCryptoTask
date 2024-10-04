import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Apollo Graph related imports
import {useLazyQuery} from '@apollo/client';

// Redux related
import {useDispatch, useSelector} from 'react-redux';

import {StyleSheet, Text, View} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import MainScreen from '../screens/MainScreen';
import {GET_LISTINGS} from '../utils/graphql/gql-queries';
import {
  addTokenListings,
  listingLastFetchTime,
} from '../redux/features/category/listingSlice';
import axios from 'axios';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const state = useSelector(state => state);

  // We will load fresh data on this screen
  const [fetchData] = useLazyQuery(GET_LISTINGS, {
    fetchPolicy: 'network-only',
    // nextFetchPolicy: 'cache-first',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const reduxListingLastFetchTime = state?.listing?.lastFetchTime;

  // Function to fetch images from CoinGecko
  const fetchCoinDataFromCoinGecko = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 30,
            page: 1,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching data from CoinGecko:', error);
      return [];
    }
  };

  // this is to fetch the tokens from the graphql endpoint and saving to redux
  const loadDataFromServer = async () => {
    console.log('--- Fetching data from graphQL server ---');

    fetchData({
      variables: {limit: 20, start: 1},

      onCompleted: async data => {
        if (data?.getLatestListings?.data?.length) {
          // Fetch data from CoinGecko
          const coinGeckoData = await fetchCoinDataFromCoinGecko();

          // Map through the GraphQL data and add image from CoinGecko response
          const updatedListings = data?.getLatestListings?.data.map(coin => {
            const matchingCoin = coinGeckoData?.find(
              geckoCoin =>
                geckoCoin?.symbol?.toLowerCase() ===
                coin?.symbol?.toLowerCase(),
            );

            return {
              ...coin,
              image: matchingCoin ? matchingCoin.image : null,
            };
          });

          // dispatch to redux
          dispatch(addTokenListings(updatedListings));
        }
        dispatch(listingLastFetchTime(Date.now()));
        console.log('dataaa', data);
      },
      onError: error => {
        console.log('error', error);
      },
    });
  };

  // Only on new mounts
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // here i am checking thelast time data was fetched from the api, so as to avoid over fetching of data and to also keep the redux data upto date with the tokens from the api
      if (
        !reduxListingLastFetchTime ||
        Date.now() - reduxListingLastFetchTime >= 3600000
      ) {
        // Fetch data from the API
        loadDataFromServer();
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{
              headerShown: false,
              drawerIcon: ({color}) => (
                <Ionicons name="home-outline" color={color} size={22} />
              ),
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
