import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import WebView from 'react-native-webview';
import {API_URL} from '@utils/constants';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
const WebviewPaymentScreen = ({route}: any) => {
  const {url} = route.params || {};
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  //   const handleNavigationStateChange = async (navState: any) => {
  //     const {url: currentUrl} = navState;
  //     console.log('WebView URL:', currentUrl);

  //     // Kiểm tra nếu URL chuyển hướng là URL thành công
  //     if (currentUrl.includes('/payment/success')) {
  //     //   navigation.reset({
  //     //     index: 0,
  //     //     routes: [
  //     //       {
  //     //         name: 'BookingConfirmation',
  //     //         params: {bookingId: bookingId},
  //     //       },
  //     //     ],
  //     //   });

  //     }
  //   };

  const handleNavigationStateChange = async (navState: any) => {
    const {url: currentUrl} = navState;
    console.log('WebView URL:', currentUrl);
    // Kiểm tra nếu URL chứa /payment/success
    if (currentUrl.includes('/payment/success')) {
      // Parse URL để lấy bookingId
      const url = new URL(currentUrl);
      const searchParams = new URLSearchParams(url.search);
      const bookingId = searchParams.get('bookingId');

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BookingConfirmation',
            params: {bookingId}, // Truyền toàn bộ dữ liệu đặt phòng
          },
        ],
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <WebView
        source={{uri: url}}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

export default WebviewPaymentScreen;
