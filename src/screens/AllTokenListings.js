import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import CryptoCards from '../components/cards/CryptoCards';
import ScrollViewSpace from '../components/common/ScrollViewSpace';

const AllTokenListings = ({navigation}) => {
  const state = useSelector(state => state);

  const reduxListings = state?.listing?.tokenListings;

  return (
    <SafeAreaViewComponent>
      <View style={{marginTop: 20}}>
        <ScrollView contentContainerStyle={{marginTop: 20, padding: 0}}>
          {reduxListings &&
            reduxListings?.length &&
            reduxListings?.map((cur, i) => (
              <CryptoCards
                key={i}
                onPress={() => navigation.navigate('DetailsScreen', cur)}
                props={cur}
              />
            ))}
          <ScrollViewSpace />
        </ScrollView>
      </View>
    </SafeAreaViewComponent>
  );
};

export default AllTokenListings;

const styles = StyleSheet.create({});
