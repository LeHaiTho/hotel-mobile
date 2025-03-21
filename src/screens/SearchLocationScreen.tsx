import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
import LoadingBarComponent from '@components/LoadingBarComponent';
import {useNavigation} from '@react-navigation/native';
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

const SearchLocationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [searchText, setSearchText] = React.useState('');
  // Lấy vị trí hiện tại của người dùng
  const [currentLocation, setCurrentLocation] = React.useState<string>('');

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
      const location = data.features[0].place_name
        .split(', ')
        .slice(1, 3)
        .join(', ');
      setCurrentLocation(location);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(searchText.length);
  const handleClear = () => {
    setSearchText('');
  };

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
          paddingHorizontal: 10,
          borderWidth: 3,
          borderColor: '#FFB700',
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={{flex: 1}}
          placeholder="Nhập điểm dến"
          value={searchText}
          onChangeText={text => setSearchText(text)}
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
          {currentLocation && (
            <Text style={{fontSize: 13}}>{currentLocation}</Text>
          )}
        </View>
      </TouchableOpacity>
      <LoadingBarComponent />
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
