import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import HomeScreen from './HomeScreen';
import {COLORS} from '../theme/themes';
import SettingsScreen from './SettingsScreen';
import DetailsScreen from './DetailsScreen';
import SearchScreen from './SearchScreen';
import BookmarkScreen from './BookmarkScreen';
import AllTokenListings from './AllTokenListings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="menu-outline"
              size={30}
              color="#333"
              onPress={() => navigation.navigate('Drawer')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="TokenListing"
      component={AllTokenListings}
      options={{
        headerShown: true,
        headerTitle: 'Token List',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: '#ccc',
          fontFamily: 'ClashDisplay-Bold',
        },
        headerBackTitleVisible: false,
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const SettingsStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: '#ccc',
          fontFamily: 'ClashDisplay-Bold',
        },
      }}
    />
    <Stack.Screen
      name="Bookmark"
      component={BookmarkScreen}
      options={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTitleStyle: {
          color: '#ccc',
          fontFamily: 'ClashDisplay-Bold',
        },
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color="#fff"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          const routeWithNoTarBar = ['DetailsScreen', 'TokenListing'];
          if (routeWithNoTarBar.includes(routeName)) {
            return {display: 'none'};
          }
          return {
            backgroundColor: COLORS.black,
          };
        })(route),
        tabBarActiveTintColor: COLORS.white,
        tabBarColor: COLORS.white,
        tabBarInActiveBackgroundColor: COLORS.white,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Ionicons name="search-outline" color={color} size={26} />
          ),
          headerShown: false,
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Ionicons name="chevron-back-outline" size={20} color="#ccc" />
            </View>
          ),
          headerTitle: 'Order Details',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: '#ccc',
          },
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({route}) => ({
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Ionicons name="settings-outline" color={color} size={26} />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: '#ccc',
            fontFamily: 'ClashDisplay-Bold',
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
