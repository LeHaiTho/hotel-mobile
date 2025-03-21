import 'react-native-gesture-handler';
(globalThis as any).RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  AccountScreen,
  LoginScreen,
  DashboardScreen,
  HomeScreen,
  EmailVerificationScreen,
  OTPVerificationScreen,
  HotelDetailScreen,
  HotelImageGalleryScreen,
  RoomListScreen,
  BookingInfomationScreen,
  BookingDetailScreen,
  BookingConfirmationScreen,
  ReservationDetailScreen,
  AdjustBookingDateScreen,
  HotelSearchResultsScreen,
  SearchLocationScreen,
  Map,
} from './screens';
import {HotelCard, IconComponent} from './components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useAuthStore from '@stores/authStore';
import TabNavigator from '@naviagtion/TabNavigator';
const Stack = createStackNavigator();

const App = () => {
  const {loadUser, user, token} = useAuthStore();
  useEffect(() => {
    loadUser();
  }, []);

  return (
    // {/* // <LoginScreen />
    // // <AccountScreen />
    // // <DashboardScreen />
    // // <EmailVerificationScreen />
    // // <OTPVerificationScreen />
    // // <HotelCard />
    // // <HotelDetailScreen />
    // // <HotelImageGalleryScreen /> */}
    // <RoomListScreen />
    // <BookingInfomationScreen />
    // <BookingDetailScreen />
    // {/* <BookingConfirmationScreen /> */}
    // <ReservationDetailScreen />
    // <AdjustBookingDateScreen />
    // <HotelSearchResultsScreen />
    // <HomeScreen />
    // <Map />

    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#003b95" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#003b95',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {color: '#fff'},
            headerBackTitleStyle: {color: '#fff'},
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="SearchLocation"
            component={SearchLocationScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
