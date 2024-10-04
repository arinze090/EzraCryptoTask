import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import {COLORS} from '../../theme/themes';

const StatsCard = ({title, value}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.statsCardContainer}>
      <Text style={styles.summaryQ}>{title}</Text>
      <Text style={styles.summaryA}>{value}</Text>
    </TouchableOpacity>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  statsCardContainer: {
    width: windowWidth / 1.1,
    height: windowHeight / 17,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryQ: {
    color: '#ccc',
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    // width: windowWidth / 1.3,
    fontFamily: 'ClashDisplay-Bold',
  },
  summaryQ1: {
    color: '#ccc',
    // fontWeight: '500',
    fontSize: 14,
    // backgroundColor: 'red',
    width: windowWidth / 1.3,
  },
  summaryA: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'ClashDisplay-Bold',
  },
  summaryQ2: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  br: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  Q: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight / 15,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  breaker: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
});
