import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';

import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
// import {Icon} from 'react-native-vector-icons/Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import ModalComponent from '@components/ModalComponent';
import SearchComponent from '@components/SearchComponent';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {COLORS} from '@styles/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import {API_URL, formatDate} from '@utils/constants';
import useAuthStore from '@stores/authStore';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
  name: string;
  library:
    | 'AntDesign'
    | 'Ionicons'
    | 'SimpleLineIcons'
    | 'Feather'
    | 'MaterialCommunityIcons'
    | 'Foundation'
    | 'Fontisto'; // Removed duplicated AntDesign from here
};

// getIcon dùng để thay đổi các icon của menu nếu khác thư viện (fontawesome, ant-design, etc.)
const getIcon = (icon: IconType) => {
  switch (icon.library) {
    case 'AntDesign':
      return <AntDesign name={icon.name} size={20} color="#fff" />;
    case 'Ionicons':
      return <Ionicons name={icon.name} size={20} color="#fff" />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={icon.name} size={20} color="#fff" />;
    case 'Feather':
      return <Feather name={icon.name} size={20} color="#fff" />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={icon.name} size={20} color="#fff" />;
    case 'Foundation':
      return <Foundation name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
    case 'Fontisto':
      return <Fontisto name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
    default:
      return <Ionicons name={icon.name} size={20} color="#fff" />;
  }
};

// Khuyến mãi
const propotionData = [
  {
    id: 0,
    title: 'Genius',
    icon: {},
    description:
      'Lê ơi, bạn dang là Genius Cấp 1 trong chương trình khách hàng thân thiết của chúng tôi',
  },
  {
    id: 1,
    title: 'Giảm giá 10% cho chỗ nghỉ',
    name: 'Ưu đãi',
    icon: {name: 'percent', library: 'Feather'},
    description: 'Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu',
  },
  {
    id: 2,
    title: 'Giảm giá 10% khi thuê xe',
    icon: {
      name: 'car',
      library: 'AntDesign',
    },
    description: 'Tiết kiệm cho một số xe cho thuê',
  },
  {
    id: 3,
    title: 'Giảm giá 15% cho chỗ nghỉ',
    icon: {
      name: 'calendar',
      library: 'Feather',
    },
    description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
  },
  {
    id: 4,
    title: 'Nâng hạng phòng miễn phí',
    icon: {
      name: 'calendar',
      library: 'Feather',
    },
    description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
  },
];

// Dữ liệu menu
const menuData = [
  {
    id: 1,
    title: 'Lưu trú',
    icon: {
      name: 'home-outline',
      library: 'Ionicons',
    },
  },
  {
    id: 2,
    title: 'Chuyến bay',
    icon: {
      name: 'plane',
      library: 'SimpleLineIcons',
    },
  },
  {
    id: 3,
    title: 'Thuê xe',
    icon: {
      name: 'car',
      library: 'AntDesign',
    },
  },
  {
    id: 4,
    title: 'Taxi',
    icon: {
      name: 'taxi',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 5,
    title: 'Địa điểm tham quan',
    icon: {
      name: 'map',
      library: 'Foundation',
    },
  },
];

// lấy độ rộng màn hình
const {width} = Dimensions.get('window');

const products = Array.from({length: 10}).map((_, index) => ({
  id: index + 1,
  name: `Sản phẩm ${index + 1}`,
  price: `VNĐ ${((index + 1) * 100000).toLocaleString()}`,
  image: 'https://via.placeholder.com/150',
}));
const renderItem = ({item}: any) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      paddingHorizontal: 12,
      justifyContent: 'center',
      borderWidth: 0.7,
      borderColor: '#fff',
      minHeight: 50,
      backgroundColor: 'rgba(255,255,255,0.2)',
      gap: 8,
    }}>
    {getIcon(item.icon)}
    <Text
      style={{
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
      }}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}: {navigation: any}) => {
  const route = useRoute();
  const {currentLocation}: any = route?.params || {};
  const [isOpenBottomsheet, setIsOpenBottomsheet] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState<any>([]);
  const {token, user} = useAuthStore();
  console.log(user);
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpenBottomsheet = () => {
    // setIsOpenBottomsheet(true);
    bottomSheetRef.current?.present();
  };

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     // Khi screen mất focus (blur), đóng BottomSheet
  //     setIsOpenBottomsheet(false);
  //     bottomSheetRef.current?.dismiss();
  //   });

  //   return unsubscribe; // Cleanup listener khi unmount
  // }, [navigation]);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0} // Backdrop xuất hiện khi Bottom Sheet ở snap point đầu tiên
      disappearsOnIndex={-1} // Backdrop biến mất khi Bottom Sheet đóng
      opacity={0.7} // Độ trong suốt của backdrop (0 - trong suốt, 1 - hoàn toàn mờ)
      pressBehavior="none"
    />
  );
  // console.log('currentLocation', currentLocation);

  const getUpcomingBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/booking/upcoming`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUpcomingBookings(response?.data?.result);
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log(token);
  useEffect(() => {
    if (token) {
      getUpcomingBookings();
    }
  }, [token]);
  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={menuData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            gap: 5,
            backgroundColor: '#003b95',
            paddingBottom: 15,
          }}
        />
        <ScrollView
          contentContainerStyle={{gap: 16}}
          showsVerticalScrollIndicator={false}>
          {/* Tìm kiếm */}
          <SearchComponent location={currentLocation} />
          {/* <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <AntDesign name="search1" size={24} color="#000" />
            <Text
              style={{
                paddingVertical: 14,
                color: '#000',
              }}>
              Th6, 17 thg 1 - CN, 19 thg11
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <AntDesign name="calendar" size={24} color="#000" />
            <Text
              style={{
                paddingVertical: 14,
                color: '#000',
              }}>
              Th6, 17 thg 1 - CN, 19 thg11
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <AntDesign name="user" size={24} color="#000" />
            <Text
              style={{
                paddingVertical: 14,
                color: '#000',
              }}>
              1 phòng - <Text>2 người lớn</Text> - <Text>0 trẻ em</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#0165FF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}
            onPress={openModal}>
            <Text
              style={{
                paddingVertical: 14,
                color: '#FFF',
                fontWeight: '500',
              }}>
              Tìm
            </Text>
          </TouchableOpacity>
        </View> */}

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={
              {
                // paddingHorizontal: 16,
                // gap: 16,
              }
            }>
            {/* Chuyến đi hiện tại */}
            {upcomingBookings?.length > 0 && (
              <View
                style={{
                  marginHorizontal: 16,
                  gap: 20,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Chuyến đi hiện tại{' '}
                  <Text
                    style={{
                      color: COLORS.red,
                      fontSize: 13,
                      fontStyle: 'italic',
                    }}>
                    ({upcomingBookings?.length} chuyến đi)
                  </Text>
                </Text>
                <Pressable
                  style={({pressed}) => {
                    return {
                      backgroundColor: pressed
                        ? COLORS.grayLight
                        : COLORS.white,
                      padding: 16,
                      borderRadius: 10,
                      borderColor: COLORS.black,
                      shadowColor: COLORS.black,
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 3.2,
                      shadowRadius: 3.84,
                      elevation: 5,
                      gap: 10,
                    };
                  }}
                  onPress={() =>
                    navigation.navigate('ReservationDetail', {
                      infoBooking: upcomingBookings[0],
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}>
                    <View style={{flexDirection: 'column', gap: 10}}>
                      <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
                        {upcomingBookings[0]?.Hotel?.name}
                      </Text>
                      <View style={{flexDirection: 'row', gap: 10}}>
                        <Text style={{color: COLORS.black}}>
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkin_date,
                          )}{' '}
                          -{' '}
                          {formatDate(
                            upcomingBookings[0]?.BookingDetails[0]
                              ?.checkout_date,
                          )}
                        </Text>
                        <Text style={{color: COLORS.green}}>Đã xác nhận</Text>
                      </View>
                    </View>
                    <Image
                      source={{
                        uri: `${API_URL}/hotel-properties/hotel/get-image/${
                          upcomingBookings[0]?.Hotel?.id
                        }/${upcomingBookings[0]?.Hotel?.images?.split(',')[0]}`,
                      }}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 25,
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="dot-single" size={24} color={COLORS.black} />
                    <Text style={{color: COLORS.black}}>
                      Nhận phòng từ {upcomingBookings[0]?.Hotel?.checkinto}
                    </Text>
                  </View>

                  <Pressable
                    style={({pressed}) => {
                      return {
                        backgroundColor: pressed
                          ? COLORS.grayLight
                          : COLORS.white,
                        padding: 8,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: COLORS.grayDark,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        alignSelf: 'flex-start',
                      };
                    }}
                    onPress={handleOpenBottomsheet}>
                    <Ionicons
                      name="chatbubbles-outline"
                      color={COLORS.black}
                      size={20}
                    />
                    <Text style={{color: COLORS.black}}>Liên hệ chỗ nghỉ</Text>
                  </Pressable>
                </Pressable>
              </View>
            )}
            {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={propotionData}
            contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: width * 0.8,
                  borderRadius: 8,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 10, height: 6},
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  backgroundColor: '#fff',
                  padding: 16,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Image
                  source={{
                    uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                  }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 4,
                  }}
                />
                <View>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '500',
                    }}>
                    Paris
                  </Text>
                  <Text>25 - 26 thg 1, 2 người lớn</Text>
                </View>
              </TouchableOpacity>
            )}
            snapToInterval={width * 0.8 + 16}
            snapToAlignment="start"
            decelerationRate="fast"
          /> */}
          </View>

          {/* Khuyến mãi */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: 'bold',
                marginHorizontal: 16,
              }}>
              Đi nhiều hơn, trả ít hơn
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 16,
              }}
              snapToInterval={width * 0.5 + 10}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    padding: 14,
                    borderWidth: index === 0 ? 0 : 1,
                    borderColor:
                      index === 0
                        ? '#003b95'
                        : index === 1 || index === 2
                        ? '#0156ff'
                        : 'rgba(224, 224, 224, 0.9)',
                    borderRadius: 8,
                    marginBottom: 16,
                    backgroundColor:
                      index === 0
                        ? '#003b95'
                        : index === 1 || index === 2
                        ? '#fff'
                        : 'rgba(224, 224, 224, 0.5)',
                    gap: 10,
                    width: width * 0.5,
                  }}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: index === 0 ? '#fff' : '#000',
                      fontSize: index === 0 ? 18 : 14,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: index === 0 ? '#fff' : '#000',
                      fontSize: index === 0 ? 14 : 12,
                    }}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Tiếp tục tìm kiếm của bạn */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Tiếp tục tìm kiếm của bạn
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.8,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                    backgroundColor: '#fff',
                    padding: 16,
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 4,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '500',
                      }}>
                      Paris
                    </Text>
                    <Text>25 - 26 thg 1, 2 người lớn</Text>
                  </View>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.8 + 16}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>

          {/* Ưu đãi cho cuối tuần  */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Chỗ nghỉ ở TP. Hồ Chí Minh
              </Text>
              <Text style={{color: '#000'}}>
                Đề xuất dựa trên tìm kiếm gần đây của bạn
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => console.log('Pressed')}
                  style={{
                    backgroundColor: '#fff',
                    width: width * 0.55,
                    borderRadius: 8,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  }}>
                  <Image
                    source={{
                      uri: 'https://www.huonggianghotel.com.vn/wp-content/uploads/2018/06/DSC_4211-HDR2_1600x1068-1.jpg',
                    }}
                    style={{
                      width: '100%',
                      height: width * 0.5,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      padding: 10,
                      gap: 3,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        lineHeight: 22,
                      }}
                      numberOfLines={2}>
                      KT MERAKI BOUTIQUE - Bui vien walking street
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#003b95',
                          padding: 4,
                          borderRadius: 4,
                          borderBottomLeftRadius: 0,
                          alignSelf: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                          }}>
                          7.1
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#000',
                        }}>
                        Tốt - 100 đánh giá
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <EvilIcons name="location" size={20} color="#000" />
                      <Text
                        style={{
                          color: '#000',
                        }}>
                        TP.Hồ Chí Minh
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#008234',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#fff',
                        }}>
                        Ưu Đãi Đầu Năm 2025
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '600',
                          textAlign: 'right',
                        }}>
                        Giá cho 2 đêm, 2 người lớn
                      </Text>
                      <Text
                        style={{
                          color: '#f20000',
                          textDecorationLine: 'line-through',
                          textAlign: 'right',
                        }}>
                        VNĐ 3.000.000
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 20,
                          textAlign: 'right',
                        }}>
                        VNĐ 1.350.000
                      </Text>
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
                          color="#008234"
                        />
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#008234',
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
                          color="#008234"
                        />
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#008234',
                            fontSize: 13,
                          }}>
                          Không cần thanh toán trước
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.55 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>

          {/* Du khách cũng đã đặt */}
          <View
            style={{
              // paddingHorizontal: 16,
              gap: 9,
            }}>
            <View
              style={{
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Du khách cũng đã đặt
              </Text>
              <Text style={{color: '#000', lineHeight: 22}}>
                Thêm gợi ý cho chuyến đi của bạn trong khoảng thời gian ngày 17
                tháng 1 - ngày 19 tháng 1
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={propotionData}
              contentContainerStyle={{
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: width * 0.55,
                    height: width * 0.7,
                    borderRadius: 8,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 6},
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }}>
                  <Image
                    source={{
                      uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 8,
                    }}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}>
                    TP. Hồ Chí Minh
                  </Text>
                </TouchableOpacity>
              )}
              snapToInterval={width * 0.55 + 12}
              snapToAlignment="start"
              decelerationRate="fast"
            />
          </View>
        </ScrollView>
      </View>
      <BottomSheetModal
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={[200]}
        enableDynamicSizing={false}
        handleIndicatorStyle={{
          backgroundColor: COLORS.grayLight,
          width: 40,
        }}
        enableContentPanningGesture={false}
        overDragResistanceFactor={0}
        // enableHandlePanningGesture={false} // Tắt kéo handle
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            paddingHorizontal: 18,
            backgroundColor: COLORS.white,
            flex: 1,
            paddingVertical: 10,
          }}>
          <Text style={{color: COLORS.black, fontSize: 18, fontWeight: 'bold'}}>
            Liên hệ chỗ nghỉ
          </Text>
          <View style={{marginTop: 10}}>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}
              onPress={() => {}}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                Nhắn tin cho chỗ nghỉ
              </Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
                  marginHorizontal: -18,
                  paddingHorizontal: 18,
                  paddingVertical: 16,
                },
              ]}>
              <Text style={{color: COLORS.primary, fontWeight: '600'}}>
                +84 {upcomingBookings[0]?.Hotel?.User?.phonenumber}
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default HomeScreen;
