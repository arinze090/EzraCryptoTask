import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {windowWidth} from '../../utils/Dimensions';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props?.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
        onPress={Keyboard.dismiss}>
        {/* search Icon */}
        <Ionicons
          name="search-outline"
          size={27}
          //   backgroundColor="#1974BA"
          color="#fff"
          onPress={props?.onPressIn}
        />

        {/* Input field */}
        <TouchableWithoutFeedback onFocus={Keyboard.dismiss}>
          <TextInput
            style={styles.input}
            placeholder="Find your favorite token ..."
            value={props.searchPhrase}
            onChangeText={props?.setSearchPhrase}
            placeholderTextColor="#757575"
            // focusable={true}
            onPressIn={props?.onPressIn}
            autoFocus={props?.autoFocus}
            onFocus={props?.onFocus}
            onPress={props?.onPress}

            //   clearTextOnFocus={true}
          />
        </TouchableWithoutFeedback>

        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {props?.clicked && (
          <Ionicons
            name="close-outline"
            size={20}
            color="red"
            style={{padding: 1}}
            onPress={() => {
              props?.setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {props?.clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              props?.setClicked(false);
              props?.setSearchPhrase('');
            }}
            color="#666"
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: windowWidth / 1.06,
    marginBottom: 10,
    marginTop: 10,
    // marginBottom: 10,
    marginLeft: 0,
  },
  searchBar__unclicked: {
    padding: 7,
    flexDirection: 'row',
    width: '97%',
    backgroundColor: '#212121',
    borderRadius: 12,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '90%',
    color: 'white',
    fontFamily: 'ClashDisplay-Bold',
  },
});
