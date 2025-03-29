import 'react-native-gesture-handler';
import TabNavigator from '@naviagtion/TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAuthStore from '@stores/authStore';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BookingInfomationScreen,
  HotelDetailScreen,
  HotelSearchResultsScreen,
  LoginScreen,
  RoomListScreen,
  SearchLocationScreen,
  BookingConfirmationScreen,
  BookingDetailScreen,
  ReservationDetailScreen,
} from './screens';
import {useNavigation} from '@react-navigation/native';
import IconComponent from '@components/IconComponent';

const Stack = createNativeStackNavigator();

const App = () => {
  const {getUser} = useAuthStore();
  useEffect(() => {
    const getUserInfo = async () => {
      await getUser();
    };
    getUserInfo();
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
            },
            headerShadowVisible: false,
            headerTitleStyle: {color: '#fff'},
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen
            name="SearchLocation"
            component={SearchLocationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HotelSearchResults"
            component={HotelSearchResultsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HotelDetail"
            component={HotelDetailScreen}
            options={{
              headerTintColor: '#fff',
              title: '',
            }}
          />
          <Stack.Screen
            name="RoomList"
            component={RoomListScreen}
            options={{
              headerTintColor: '#fff',
              title: '',
            }}
          />
          <Stack.Screen
            name="BookingInfomation"
            component={BookingInfomationScreen}
            options={{
              headerTitleAlign: 'left',
              headerTintColor: '#fff',
              title: 'Điền thông tin của bạn',
            }}
          />
          <Stack.Screen
            name="BookingDetail"
            component={BookingDetailScreen}
            options={{
              headerTitleAlign: 'left',
              headerTintColor: '#fff',
              title: 'Chi tiết đặt phòng',
            }}
          />
          <Stack.Screen
            name="BookingConfirmation"
            component={BookingConfirmationScreen}
            options={{
              headerTintColor: '#fff',
              headerTitleAlign: 'left',
              title: 'Xác nhận đặt phòng',
            }}
          />
          <Stack.Screen
            name="ReservationDetail"
            component={ReservationDetailScreen}
            options={{
              headerTintColor: '#fff',
              headerTitleAlign: 'left',
              title: 'Chi tiết đặt phòng',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
