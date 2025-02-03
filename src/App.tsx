// import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
} from './screens';
import {HotelCard} from './components';

const App = () => {
  return (
    // {/* // <LoginScreen />
    // // <AccountScreen />
    // // <DashboardScreen />
    // // <HomeScreen />
    // // <EmailVerificationScreen />
    // // <OTPVerificationScreen />
    // // <HotelCard />
    // // <HotelDetailScreen />
    // // <HotelImageGalleryScreen /> */}
    <GestureHandlerRootView style={{flex: 1}}>
      <RoomListScreen />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
