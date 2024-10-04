import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {formatToPercentage, formatToUSD} from '../../Library/Common';

const CryptoCards = ({onPress, props}) => {
  const dailyChangePercent = formatToPercentage(
    props?.quote?.USD?.percent_change_1h,
  );

  const isPositive = props?.quote?.USD?.percent_change_1h >= 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cryptoCard}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: props?.image,
          }}
          style={styles.cryptoLogo}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.coinName}>{props?.name}</Text>
          <Text style={styles.coinAbb}>{props?.symbol}</Text>
        </View>
      </View>
      <View style={styles.amountSection}>
        <Text style={[styles.coinName]}>
          {formatToUSD(props?.quote?.USD?.price)}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            name={isPositive ? 'caret-up-outline' : 'caret-down-outline'}
            color={isPositive ? 'green' : 'red'}
            size={20}
          />
          <Text style={[styles.coinAbb, {color: isPositive ? 'green' : 'red'}]}>
            {dailyChangePercent}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCards;

const styles = StyleSheet.create({
  cryptoCard: {
    width: windowWidth / 1,
    height: windowHeight / 11,
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cryptoLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  coinName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'ClashDisplay-Bold',
  },
  coinAbb: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
    fontFamily: 'ClashDisplay-Bold',
  },
  amountSection: {
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
