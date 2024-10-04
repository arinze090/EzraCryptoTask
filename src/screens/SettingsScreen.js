import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaViewComponent from '../components/common/SafeAreaViewComponent';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import {COLORS} from '../theme/themes';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../redux/features/user/userSlice';

const settings = [
  {
    iconName: 'bookmark-outline',
    name: 'Saved Tokens',
    navigate: 'Bookmark',
  },
];

const SettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  function logout() {
    dispatch(signOut());

    navigation.navigate('HomeScreen');
  }

  return (
    <SafeAreaViewComponent>
      <View style={styles.imageSection}>
        <View style={styles.imageProfile}>
          <Image
            source={require('../assets/1.jpg')}
            style={styles.celebProfileImage}
          />
        </View>
        <Text style={styles.profileText}>Arinze</Text>
      </View>
      {settings?.map((cur, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.9}
          style={styles.set}
          onPress={() => navigation.navigate(cur?.navigate)}>
          <View style={styles.setsContent}>
            <Ionicons name={cur?.iconName} size={20} color="#ccc" />
            <Text style={styles.settingsText}>{cur?.name}</Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#333"
            style={{marginTop: 5}}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.set} onPress={logout}>
        <View style={styles.setsContent}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.settingsText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaViewComponent>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  imageSection: {
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.pinky,
  },
  celebProfileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.purple,
  },
  profileText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'ClashDisplay-Bold',
  },
  editBtn: {
    backgroundColor: COLORS.pinky,
    borderRadius: 6,
    width: windowWidth / 1.4,
    alignSelf: 'center',
    alignItems: 'center',
    height: windowHeight / 19,
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  settings: {
    margin: 5,
    marginTop: 30,
    borderTopWidth: 1,
    marginBottom: 20,
  },
  set: {
    marginBottom: 8,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  setsContent: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ccc',
    marginLeft: 17,
    fontFamily: 'ClashDisplay-Bold',
  },
  loadingIndicator: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    height: windowHeight,
    backgroundColor: '#000',
    opacity: 0.9,
    width: windowWidth,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
