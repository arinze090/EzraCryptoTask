import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../utils/Dimensions';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.splashContainer}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'ClashDisplay-Bold',
            color: 'white',
            fontSize: 30,
            marginBottom: 10,
          }}>
          Crypto Task
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'ClashDisplay-Regular',
            color: 'white',
            fontSize: 16,
          }}>
          Powered by Arinze
        </Text>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: windowHeight,
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    width: windowWidth,
    resizeMode: 'contain',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});
