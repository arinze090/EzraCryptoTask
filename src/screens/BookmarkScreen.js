import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import {useDispatch, useSelector} from 'react-redux';
import CryptoCards from '../components/cards/CryptoCards';
import ScrollViewSpace from '../components/common/ScrollViewSpace';

const BookmarkScreen = ({navigation}) => {
  const state = useSelector(state => state);

  const reduxBookmarkedListings = state?.listing?.savedCoins;

  return (
    <SafeAreaViewComponent>
      <View style={{marginTop: 20}}>
        <ScrollView contentContainerStyle={{marginTop: 20, padding: 0}}>
          {reduxBookmarkedListings && reduxBookmarkedListings?.length ? (
            reduxBookmarkedListings?.map((cur, i) => (
              <CryptoCards
                key={i}
                onPress={() => navigation.navigate('DetailsScreen', cur)}
                props={cur}
              />
            ))
          ) : (
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'ClashDisplay-Bold',
                color: 'white',
                marginTop: 30,
              }}>
              You have no Bookmarked Token
            </Text>
          )}
          <ScrollViewSpace />
        </ScrollView>
      </View>
    </SafeAreaViewComponent>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({});
