import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {windowWidth} from '../../utils/Dimensions';

const CryptoChart = ({props}) => {
  const currentPrice = props?.quote?.USD?.price;

  // Here i am calculating the price difference using the percentages
  const price1hAgo =
    currentPrice / (1 + props?.quote?.USD?.percent_change_1h / 100);
  const price24hAgo =
    currentPrice / (1 + props?.quote?.USD?.percent_change_24h / 100);
  const price7dAgo =
    currentPrice / (1 + props?.quote?.USD?.percent_change_7d / 100);

  // Set the chart data with actual price values
  const [chartData, setChartData] = useState({
    labels: ['7d ago', '24h ago', '1h ago', 'Now'],
    datasets: [
      {
        data: [price7dAgo, price24hAgo, price1hAgo, currentPrice],
      },
    ],
  });

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={windowWidth / 1.1}
        height={300}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1}
        verticalLabelRotation={30}
        chartConfig={{
          backgroundColor: '#1E2923',
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        fromZero
        style={{
          marginVertical: 8,
          borderRadius: 16,
          fontFamily: 'ClashDisplay-Bold',
        }}
      />
    </View>
  );
};

export default CryptoChart;

const styles = StyleSheet.create({
  container: {
    width: windowWidth / 1.1,
    // backgroundColor: 'red',
  },
});
