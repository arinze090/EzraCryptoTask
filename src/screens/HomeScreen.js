import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../theme/themes';
import CryptoCards from '../components/cards/CryptoCards';
import TopCryptoCards from '../components/cards/TopCryptoCards';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import {useDispatch, useSelector} from 'react-redux';
import ScrollViewSpace from '../components/common/ScrollViewSpace';
import SearchBar from '../components/search/SearchBar';
import CustomText from '../components/form/CustomText';
import {windowWidth} from '../utils/Dimensions';

const HomeScreen = ({navigation}) => {
  const state = useSelector(state => state);

  const reduxListings = state?.listing?.tokenListings;

  return (
    <SafeAreaViewComponent>
      <View style={{padding: 20}}>
        <View style={styles.viewContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/1.jpg')}
              style={styles.profileImage}
            />
            <CustomText style={styles.welcomeText}>Welcome, Arinze</CustomText>
          </View>
          <Ionicons
            name="settings-outline"
            color={COLORS.white}
            size={20}
            onPress={() =>
              navigation.navigate('SettingsStack', {screen: 'Settings'})
            }
          />
        </View>

        {/* SearchBar Section */}
        <SearchBar onPressIn={() => navigation.navigate('Search')} />

        {reduxListings && reduxListings?.length ? (
          <>
            {/* Top Tokens Section */}
            <View>
              <Text style={[styles.topTokensText]}>Top Tokens</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginBottom: 20,
                }}>
                {reduxListings &&
                  reduxListings?.length &&
                  reduxListings
                    ?.slice(0, 5)
                    ?.map((cur, i) => (
                      <TopCryptoCards
                        props={cur}
                        key={i}
                        onPress={() =>
                          navigation.navigate('DetailsScreen', cur)
                        }
                      />
                    ))}
              </ScrollView>
            </View>

            {/* Random Tokens Section */}
            <View style={{marginTop: 20}}>
              <View style={styles.titleSection}>
                <Text style={[styles.text, {fontFamily: 'ClashDisplay-Bold'}]}>
                  Tokens
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={
                    reduxListings?.length > 0
                      ? () => navigation.navigate('TokenListing')
                      : null
                  }>
                  <Text style={styles.all}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={{marginTop: 20, padding: 0}}>
                {reduxListings && reduxListings?.length
                  ? [...reduxListings]
                      .sort(() => Math.random() - 0.5)
                      ?.map((cur, i) => (
                        <CryptoCards
                          key={i}
                          onPress={() =>
                            navigation.navigate('DetailsScreen', cur)
                          }
                          props={cur}
                          width={windowWidth / 1.11}
                        />
                      ))
                  : null}

                <ScrollViewSpace />
              </ScrollView>
            </View>
          </>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'ClashDisplay-Bold',
              color: 'white',
            }}>
            Please wait while we fetch your data
          </Text>
        )}
      </View>
    </SafeAreaViewComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  viewContainer: {
    // padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  topTokensText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
    fontFamily: 'ClashDisplay-Bold',
  },
  titleSection: {
    flexDirection: 'row',
    // alignContent: 'space-between',
    alignItems: 'center',
    // margin: 10,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  all: {
    fontSize: 15,
    color: COLORS.pinky,
    fontWeight: '600',
    fontFamily: 'ClashDisplay-Bold',
  },
});
