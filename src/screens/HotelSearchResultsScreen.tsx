import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import IconComponent from '@components/IconComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import {API_URL} from '../utils/constants';

import {formatDate} from '@utils/constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '@styles/colors';
const HotelSearchResultsScreen = ({route}: any) => {
  const {searchCondition} = route?.params || {};
  const [hotelResults, setHotelResults] = useState<any[]>([]);
  console.log('searchCondition', searchCondition);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    const getHotels = async () => {
      // const queryString = new URLSearchParams(searchCondition).toString();
      const params = {
        checkInDate: searchCondition.checkInDate,
        checkOutDate: searchCondition.checkOutDate,
        longitude: searchCondition.location.longitude,
        latitude: searchCondition.location.latitude,
        adults: searchCondition.capacity.adults,
        children: searchCondition.capacity.children,
      };

      try {
        console.log(
          `${API_URL}/hotel-properties/searchresults`,
          `${API_URL}/hotel-properties/searchresults`,
        );
        const response = await axios.get(
          `${API_URL}/hotel-properties/searchresults`,
          {
            params,
          },
        );
        setHotelResults(response?.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getHotels();
  }, []);

  const handlePressHotel = (hotel: any) => {
    const data = {
      id: hotel?.id,
      ...searchCondition,
      name: hotel?.name,
      address: hotel?.address,
      images: hotel?.images,
      distance: hotel?.distance,
    };
    navigation.push('HotelDetail', {
      hotel: data,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header + button search */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
      />
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: COLORS.primaryDark,
          gap: 20,
        }}>
        {/* Search Bar - Đặt trồi lên trên */}

        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderWidth: 4,
              borderColor: COLORS.yellowGold,
              borderRadius: 10,
              backgroundColor: pressed ? COLORS.grayLight : COLORS.white, // Hiệu ứng nhấn nhẹ
              shadowColor: COLORS.black,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              transform: [{translateY: 25}],
              zIndex: 2,
              position: 'relative',
            },
          ]}
          onPress={() => console.log('Pressed!')}>
          <Pressable
            style={({pressed}) => [
              {flexDirection: 'row', alignItems: 'center', gap: 5},
              {
                backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                padding: 5,
                borderRadius: 50,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <IconComponent
              name="arrow-left"
              library="MaterialCommunityIcons"
              size={24}
              color={COLORS.black}
            />
          </Pressable>
          <Text style={{color: COLORS.black, flex: 1}}>
            {`Xung quanh vị trí hiện tại · ${formatDate(
              searchCondition.checkInDate,
            )} - ${formatDate(searchCondition.checkOutDate)}`}
          </Text>
        </Pressable>
      </View>
      {/* Thanh filter phía dưới */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          shadowColor: COLORS.black,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: -1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            justifyContent: 'space-around',
            flex: 1,
            marginTop: 30,
          }}>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 1,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white, // Hiệu ứng nhấn nhẹ
                paddingVertical: 12,
              },
            ]}
            onPress={() => console.log('Pressed!')}>
            <IconComponent
              name="filter"
              library="MaterialCommunityIcons"
              size={20}
              color="#000"
            />
            <Text>Sắp xếp</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: 5,
                paddingVertical: 12,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white, // Hiệu ứng nhấn nhẹ
              },
            ]}
            onPress={() => console.log('Pressed!')}>
            <IconComponent
              name="filter"
              library="MaterialCommunityIcons"
              size={20}
              color="#000"
            />
            <Text>Sắp xếp</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 1,
                paddingVertical: 12,
                backgroundColor: pressed ? COLORS.opacity : COLORS.white, // Hiệu ứng nhấn nhẹ
              },
            ]}
            onPress={() => console.log('Pressed!')}>
            <IconComponent
              name="map-outline"
              library="Ionicons"
              size={20}
              color="#000"
            />
            <Text>Sắp xếp</Text>
          </Pressable>
        </View>
      </View>

      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={hotelResults}
          ListHeaderComponent={() => (
            <Text style={{color: '#000', paddingTop: 10}}>2574 chỗ nghỉ</Text>
          )}
          renderItem={({item}) => (
            <>
              <Pressable
                key={item?.id}
                onPress={() => handlePressHotel(item)}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? COLORS.opacity : COLORS.white,
                    width: '100%',
                    height: 'auto',
                    borderRadius: pressed ? 0 : 8,
                    gap: 12,
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  },
                ]}>
                <Image
                  source={{
                    uri: `${API_URL}/hotel-properties/hotel/get-image/${
                      item?.id
                    }/${item?.images?.split(',')[0]}`,
                  }}
                  style={{
                    width: 100,
                    height: 'auto',
                    borderRadius: 8,
                    flex: 1,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    gap: 3,
                    flex: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        lineHeight: 22,
                        flex: 1,
                      }}
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                    <TouchableOpacity style={{paddingHorizontal: 5}}>
                      <IconComponent
                        name="heart-o"
                        library="FontAwesome"
                        size={18}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: COLORS.primaryDark,
                        padding: 4,
                        borderRadius: 4,
                        borderBottomLeftRadius: 0,
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: 12,
                        }}>
                        7.1
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}>
                      Tốt{' '}
                      <IconComponent
                        name="dot-single"
                        library="Entypo"
                        size={10}
                        color={COLORS.black}
                      />
                      <Text style={{color: COLORS.gray, fontSize: 13}}>
                        100 đánh giá
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <EvilIcons name="location" size={20} color={COLORS.black} />
                    <Text
                      style={{
                        color: COLORS.black,
                        fontSize: 12,
                      }}>
                      {`cách bạn ${Number(item?.distance?.toFixed(2))} km`}
                      {/* <IconComponent
                        name="dot-single"
                        library="Entypo"
                        size={10}
                        color="#000"
                      />{' '}
                      <Text style={{fontSize: 12}}>cách trung tâm 100 m</Text> */}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: COLORS.green,
                      alignSelf: 'flex-start',
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: COLORS.white,
                      }}>
                      Ưu Đãi Đầu Năm 2025
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: COLORS.black,
                        fontWeight: '600',
                        textAlign: 'right',
                      }}>
                      Giá cho{' '}
                      {moment(searchCondition.checkOutDate).diff(
                        moment(searchCondition.checkInDate),
                        'days',
                      )}{' '}
                      đêm, {searchCondition.capacity.adults} người lớn
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: COLORS.red,
                          textDecorationLine: 'line-through',
                          textAlign: 'right',
                        }}>
                        {`VNĐ ${Math.round(
                          item?.Rooms?.[0]?.sotien / 0.6,
                        ).toLocaleString()}`}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontWeight: '700',
                          fontSize: 19,
                          textAlign: 'right',
                        }}>
                        VNĐ {item?.Rooms?.[0]?.sotien.toLocaleString()}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: 'right',
                      }}>
                      Đã bao gồm thuế và phí
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 5,
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={14}
                        color={COLORS.green}
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          color: COLORS.green,
                          fontSize: 13,
                        }}>
                        Hủy miễn phí
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 5,
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={14}
                        color={COLORS.green}
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          color: COLORS.green,
                          fontSize: 13,
                        }}>
                        Không cần thanh toán trước
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.borderGray,
                  marginHorizontal: -16,
                }}
              />
            </>
          )}
        />
      </View>
    </View>
  );
};

export default HotelSearchResultsScreen;
