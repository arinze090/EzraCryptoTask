import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import ListingSearchBar from '../components/search/ListingSearch';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import CryptoCards from '../components/cards/CryptoCards';
import ScrollViewSpace from '../components/common/ScrollViewSpace';

const SearchScreen = ({navigation}) => {
  const state = useSelector(state => state);

  const reduxListings = state?.listing?.tokenListings;

  // Search filter states
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState(reduxListings);
  const [filteredDataSource, setFilteredDataSource] = useState(reduxListings);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <SafeAreaViewComponent style={styles.container}>
      {/* SearchBar Section */}
      <ListingSearchBar
        searchPhrase={search}
        setSearchPhrase={text => searchFilterFunction(text)}
        clicked={clicked}
        setClicked={setClicked}
        autoFocus={true}
      />

      {search === '' ? (
        <View style={styles.searchCat}>
          <Text style={styles.searchCatText}>
            Search for your favorite token
          </Text>
        </View>
      ) : (
        <ScrollView vertical contentContainerStyle={styles.scrollviewContainer}>
          {filteredDataSource?.map((cur, i) => {
            return (
              <View key={cur?.id + '-' + cur?.name + '-' + i}>
                <CryptoCards
                  props={cur}
                  onPress={() => navigation.navigate('DetailsScreen', cur)}
                />
              </View>
            );
          })}
          <ScrollViewSpace />
        </ScrollView>
      )}
    </SafeAreaViewComponent>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    marginLeft: 6,
    marginTop: 10,
  },
  searchCat: {
    margin: 20,
    // backgroundColor: 'pink',
    marginTop: 30,
  },
  searchCatText: {
    color: '#ccc',
    fontSize: 15,
    fontWeight: '700',
  },
});
