import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../theme/themes';
import StatsCard from '../components/cards/StatsCard';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import CryptoChart from '../components/chart/CryptoChart';
import {useDispatch, useSelector} from 'react-redux';
import {
  savedCoinListing,
  unSaveCoinListing,
} from '../redux/features/category/listingSlice';
import {
  formatToCurrency,
  formatToPercentage,
  formatToUSD,
  formatNumberWithCommas,
} from '../Library/Common';
import ScrollViewSpace from '../components/common/ScrollViewSpace';

const DetailsScreen = ({navigation, route}) => {
  const item = route?.params;

  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const savedCoins = state?.listing?.savedCoins;

  // Check if the coin is already saved
  const isCoinSaved = savedCoins?.some(savedCoin => savedCoin?.id === item?.id);

  const saveToken = () => {
    // dispatch the data to redux
    isCoinSaved
      ? dispatch(unSaveCoinListing(item))
      : dispatch(savedCoinListing(item));
  };

  const dailyChangePercent = formatToPercentage(
    item?.quote?.USD?.percent_change_1h,
  );

  const isPositive = item?.quote?.USD?.percent_change_1h >= 0;

  return (
    <SafeAreaViewComponent>
      {/* Icons Section */}
      <View style={styles.iconsSection}>
        <Ionicons
          name="chevron-back-outline"
          color={'white'}
          size={26}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.coinName}>{item?.name}</Text>
        <Ionicons
          name={isCoinSaved ? 'star' : 'star-outline'}
          color={isCoinSaved ? 'gold' : 'white'}
          size={20}
          onPress={saveToken}
        />
      </View>

      <ScrollView
        contentContainerStyle={{padding: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item?.image}} style={styles.coinImage} />
          <Text style={styles.coinName}>
            {item?.name} - {item?.symbol}
          </Text>
        </View>
        <View style={[styles.iconsSection, {padding: 0, marginTop: 20}]}>
          <Text style={styles.coinName}>
            {formatToUSD(item?.quote?.USD?.price)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name={isPositive ? 'caret-up-outline' : 'caret-down-outline'}
              color={isPositive ? 'green' : 'red'}
              size={20}
            />
            <Text
              style={[
                styles.coinAbb,
                {
                  color: isPositive ? 'green' : 'red',
                  fontFamily: 'ClashDisplay-Bold',
                },
              ]}>
              {dailyChangePercent}
            </Text>
          </View>
        </View>

        {/* Chart section*/}
        <CryptoChart props={item} />

        {/* Statistics section */}
        <View style={{marginTop: 40}}>
          <Text style={styles.coinName}>Statistics</Text>
          <StatsCard
            title={'Market Cap'}
            value={
              item?.quote?.USD?.market_cap
                ? formatToCurrency(item?.quote?.USD?.market_cap)
                : 'N/A'
            }
          />
          <StatsCard
            title={'Fully Diluted Cap'}
            value={
              item?.quote?.USD?.fully_diluted_market_cap
                ? formatToCurrency(item?.quote?.USD?.fully_diluted_market_cap)
                : 'N/A'
            }
          />
          <StatsCard
            title={'Volume (24hr)'}
            value={
              item?.quote?.USD?.volume_24h
                ? formatToCurrency(item?.quote?.USD?.volume_24h)
                : 'N/A'
            }
          />
          <StatsCard
            title={'Circulating Supply'}
            value={
              item?.circulating_supply
                ? `${formatNumberWithCommas(item?.circulating_supply)} ${
                    item?.symbol
                  }`
                : 'N/A'
            }
          />
          <StatsCard
            title={'Total Supply'}
            value={
              item?.total_supply
                ? `${formatNumberWithCommas(item?.total_supply)} ${
                    item?.symbol
                  }`
                : 'N/A'
            }
          />
          <StatsCard
            title={'Max Supply'}
            value={
              item?.max_supply
                ? `${formatNumberWithCommas(item?.max_supply)} ${item?.symbol}`
                : 'N/A'
            }
          />
        </View>
        <ScrollViewSpace />
      </ScrollView>
    </SafeAreaViewComponent>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  coinName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'ClashDisplay-Bold',
  },
  coinImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
