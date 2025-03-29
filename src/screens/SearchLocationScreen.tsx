import {
  Keyboard,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
import LoadingBarComponent from '@components/LoadingBarComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// data gợi ý tìm kiếm
const data = [
  {
    id: 1,
    name: 'Đồng Nai',
  },
  {
    id: 2,
    name: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Hồ Chí Minh',
  },
  //...
];

type location = {
  address?: string;
  latitude?: string;
  longitude?: string;
};
const SearchLocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = React.useState('');
  const {location}: any = route.params || {};

  console.log('location', location);
  // Lấy vị trí hiện tại của người dùng
  const [currentLocation, setCurrentLocation] = React.useState<location>();
  const inputRef = useRef<TextInput>(null);
  // cấp quyền
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cần cấp quyền truy cập vị trí của bạn',
            message:
              '��ng dụng cần truy cập vị trí của bạn để tìm kiếm nhà hàng tốt nhất',
            buttonNeutral: 'Không đ��ng ��',
            buttonNegative: 'Không',
            buttonPositive: 'Đồng ��',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          setIsLoading(true);
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        // setCurrentLocation(position);
        getAddressFromCoordinates({
          longitude: position.coords.longitude.toString(),
          latitude: position.coords.latitude.toString(),
        });
        setCurrentLocation(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // gọi API của Mapbox chuyển kinh độ vĩ độ thành địa chỉ
  const getAddressFromCoordinates = async ({
    longitude,
    latitude,
  }: {
    longitude: string;
    latitude: string;
  }) => {
    // token mapbox
    const TOKEN =
      'pk.eyJ1IjoibGVoYWl0aG8yMDAyIiwiYSI6ImNtN216ZzlzOTBvaGsycnM2YXExbmk2b3IifQ.8XDAfDAC87AGVUfcaV9tnA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${TOKEN}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // const location = data.features[0].place_name
      //   .split(', ')
      //   .slice(1, 3)
      //   .join(', ');
      // setCurrentLocation(location);
      const address = data.features[3].place_name;
      setCurrentLocation(prev => ({
        ...prev,
        address,
      }));
      setIsLoading(false);
      console.log('address', address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setSearchText('');
  };

  useEffect(() => {
    if (searchText.length === 0) {
      Keyboard.dismiss();
      inputRef.current?.focus();
    }
  }, [searchText]);

  useEffect(() => {
    if (
      currentLocation?.address &&
      currentLocation?.latitude &&
      currentLocation?.longitude
    ) {
      navigation.replace('Main', {currentLocation});
    }
  }, [currentLocation]);

  console.log('searchText', searchText);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 16,
        gap: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          borderWidth: 3,
          borderColor: '#FFB700',
          borderRadius: 8,
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
        }}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? COLORS.opacity : COLORS.white,
              borderRadius: 50,
              padding: 5,
            },
          ]}
          onPress={() => navigation.replace('Main')}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </Pressable>
        <TextInput
          style={{flex: 1}}
          placeholder="Nhập điểm dến"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          ref={inputRef}
        />
        {searchText.length > 0 && (
          <AntDesign
            name="close"
            size={22}
            color="#000"
            onPress={handleClear}
          />
        )}
      </View>
      {isLoading ? <LoadingBarComponent /> : null}
      <TouchableOpacity
        style={{
          gap: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={requestLocationPermission}>
        <MaterialIcons
          name="my-location"
          size={15}
          color="#0165FC"
          style={{
            backgroundColor: '#D8E7FA',
            padding: 10,
            borderRadius: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text style={{color: '#0165FC', fontWeight: '700'}}>
            Xung quanh vị trí hiện tại
          </Text>
          {location?.location?.address && (
            <Text style={{fontSize: 13}}>{location?.location?.address}</Text>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          gap: 16,
        }}>
        <Text style={{fontWeight: '700', fontSize: 18, color: '#000'}}>
          Tiếp tục tìm kiếm của bạn
        </Text>
        <View
          style={{
            gap: 10,
          }}>
          {data?.map(item => {
            return (
              <TouchableOpacity
                key={item?.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  gap: 14,
                }}>
                <Entypo
                  name="back-in-time"
                  size={18}
                  color="#0165fc"
                  style={{
                    backgroundColor: '#D8E7FA',
                    padding: 10,
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '700',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                    }}>
                    01 thg 3-26 thg 4, 2 người lớn
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* <View>
        {currentLocation ? (
          <Text>
            Latitude: {currentLocation.coords.latitude}, Longitude:{' '}
            {currentLocation.coords.longitude}
          </Text>
        ) : (
          <Text>Loading location...</Text>
        )}
      </View> */}
    </View>
  );
};

export default SearchLocationScreen;

const styles = StyleSheet.create({});
