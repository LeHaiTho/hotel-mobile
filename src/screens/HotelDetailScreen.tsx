import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IconComponent, ImageGrid, RatingBar} from '../components/index';
import {formatDate} from '@utils/constants';
import {API_URL} from '../utils/constants';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '@styles/colors';
import axios from 'axios';
// danh sách tiện nghi
const amenities = [
  {
    id: 1,
    name: 'Trung tâm Spa & chăm sóc sức khỏe',
    library: 'FontAwesome5',
    iconName: 'spa',
  },
  {
    id: 2,
    name: 'Điều hòa không khí',
    library: 'MaterialCommunityIcons',
    iconName: 'air-purifier',
  },
  {
    id: 3,
    name: 'Tầm nhìn ra khung cảnh',
    library: 'Ionicons',
    iconName: 'eye-outline',
  },
  {
    id: 4,
    name: 'Phòng tắm riêng',
    library: 'MaterialCommunityIcons',
    iconName: 'shower',
  },
  {
    id: 5,
    name: 'TV màn hình phẳng',
    library: 'FontAwesome',
    iconName: 'television',
  },
  {
    id: 6,
    name: 'Phòng gia đình',
    library: 'MaterialIcons',
    iconName: 'family-restroom',
  },
  {
    id: 7,
    name: 'Lễ tân 24 giờ',
    library: 'Fontisto',
    iconName: 'person',
  },
];

const HotelDetailScreen = ({route}: any) => {
  const {hotelId, ...searchCondition} = route.params;
  const [hotelDetail, setHotelDetail] = useState<any>(null);
  const remainingCount = hotelDetail?.images?.split(',').length - 5;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const getHotelDetail = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/hotel-properties/hotel/${hotelId}`,
      );
      setHotelDetail(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getHotelDetail();
  }, []);
  console.log('hotel', hotelDetail);
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap', // Đảm bảo các phần tử không tràn
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              lineHeight: 35,
              color: COLORS.black,
              flex: 1,
            }}>
            {hotelDetail?.name}
          </Text>
          <View
            style={{
              backgroundColor: COLORS.primaryDark,
              padding: 4,
              borderRadius: 5,
              borderBottomLeftRadius: 0,
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 16,
              }}>
              7.1
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            // paddingHorizontal: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <AntDesign name="star" color={COLORS.yellowGold} size={20} />
            <AntDesign name="star" color={COLORS.yellowGold} size={20} />
            <AntDesign name="star" color={COLORS.yellowGold} size={20} />
          </View>
          <View
            style={{
              backgroundColor: COLORS.yellowGold,
              paddingHorizontal: 4,
              paddingVertical: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              gap: 5,
            }}>
            <AntDesign name="like1" color={COLORS.white} size={14} />
            <FontAwesome5 name="plus" color={COLORS.white} size={12} />
          </View>
        </View>

        {/* khung ảnh*/}
        <View style={styles.container}>
          {/* Hàng 1 */}
          <View style={styles.row}>
            {hotelDetail?.images
              ?.split(',')
              ?.slice(0, 2)
              .map((image: any, index: number) => (
                <Image
                  key={index}
                  source={{
                    uri: `${API_URL}/hotel-properties/hotel/get-image/${hotelDetail?.id}/${image}`,
                  }}
                  style={styles.image}
                />
              ))}
          </View>

          {/* Hàng 2 */}
          <View style={styles.row}>
            {hotelDetail?.images
              ?.split(',')
              ?.slice(2, 4)
              .map((image: any, index: number) => (
                <Image
                  key={index}
                  source={{
                    uri: `${API_URL}/hotel-properties/hotel/get-image/${hotelDetail?.id}/${image}`,
                  }}
                  style={styles.image}
                />
              ))}

            {/* Ảnh cuối cùng có hiệu ứng đen mờ */}
            {hotelDetail?.images?.split(',').length > 6 ? (
              <View style={styles.overlayContainer}>
                <Image
                  key={hotelDetail?.images?.split(',')[4]}
                  source={{
                    uri: `${API_URL}/hotel-properties/hotel/get-image/${
                      hotelDetail?.id
                    }/${hotelDetail?.images?.split(',')[4]}`,
                  }}
                  style={styles.image}
                />
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>+{remainingCount}</Text>
                </View>
              </View>
            ) : (
              <Image
                source={{
                  uri: `${API_URL}/hotel-properties/hotel/get-image/${
                    hotelDetail?.id
                  }/${hotelDetail?.images?.split(',')[4]}`,
                }}
                style={styles.image}
              />
            )}
          </View>
        </View>

        {/* Horizontal icon và tên tiện nghi */}

        <View
          style={{
            marginHorizontal: -16,
          }}>
          <FlatList
            horizontal
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 16,
            }}
            showsHorizontalScrollIndicator={false}
            data={amenities}
            renderItem={({item}) => (
              <View
                style={{
                  gap: 8,
                  alignItems: 'center',
                  maxWidth: 120,
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.grayLight,
                    width: 45,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 23,
                  }}>
                  <IconComponent
                    name={item.iconName}
                    library={item.library}
                    size={24}
                    color={COLORS.gray}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    color: COLORS.black,
                  }}
                  numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Thông tin thời gian nhận trả phòng */}
        <View
          style={{
            gap: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                }}>
                Nhận phòng
              </Text>
              <Text style={{fontWeight: '700', color: COLORS.primary}}>
                {formatDate(searchCondition?.checkInDate, true)}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                }}>
                Trả phòng
              </Text>
              <Text style={{fontWeight: '700', color: COLORS.primary}}>
                {formatDate(searchCondition?.checkOutDate, true)}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: '500',
              }}>
              Số lượng phòng và khách
            </Text>
            <Text style={{fontWeight: '700', color: COLORS.primary}}>
              {searchCondition?.capacity?.adults} người lớn,{' '}
              {searchCondition?.capacity?.children} trẻ em
            </Text>
          </View>
        </View>

        {/* Gía */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // paddingHorizontal: 16,
          }}>
          <View>
            <Text
              style={{
                color: '#000',
              }}>
              Giá cho{' '}
              {moment(searchCondition?.checkOutDate).diff(
                moment(searchCondition?.checkInDate),
                'days',
              )}{' '}
              đêm, {searchCondition?.capacity?.adults} người lớn
            </Text>
            <Text
              style={{
                color: '#000',
                fontWeight: '700',
                fontSize: 20,
              }}>
              VND {hotelDetail?.Rooms?.[0]?.sotien?.toLocaleString()}
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}>
              {/* Đã bao gồm thuế và phí */}
            </Text>
          </View>
          <IconComponent
            name="right"
            library="AntDesign"
            size={18}
            color={COLORS.gray}
          />
        </TouchableOpacity>

        {/* không cần thẻ tín dụng */}
        <View
          style={
            {
              // paddingHorizontal: 16,
            }
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 16,
              borderWidth: 1,
              borderColor: COLORS.borderGray,
              borderRadius: 8,
              gap: 20,
            }}>
            <IconComponent
              name="credit-card-off-outline"
              color={COLORS.green}
              library="MaterialCommunityIcons"
              size={20}
            />
            <View
              style={{
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Không cần thẻ tín dụng
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  // flexWrap: 'wrap',
                  // flexShrink: 1,
                }}>
                Tất cả lựa chọn có thể đặt được mà không cần thẻ tín dụng.
              </Text>
            </View>
          </View>
        </View>

        {/* Vị trí chỗ nghỉ */}
        <View
          style={{
            // paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          <View
            style={{
              gap: 16,
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Vị trí chỗ nghỉ
            </Text>
            <Image
              source={{
                uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
              }}
              style={{
                height: 150,
                borderRadius: 8,
              }}
            />

            <Text
              style={{
                color: COLORS.black,
              }}>
              {/* {hotelDetail?.address} - {(hotelDetail?.distance).toFixed(2)} km
              từ trung tâm -{' '} */}
              <Text
                style={{
                  color: COLORS.green,
                }}>
                Địa điểm tuyệt vời
              </Text>
            </Text>
          </View>
        </View>

        {/*Cực kỳ phù hợp cho kỳ lưu trú của bạn*/}
        <View
          style={{
            // paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          <View
            style={{
              gap: 16,
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingVertical: 16,
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Cực kỳ phù hợp cho kỳ lưu trú của bạn
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                flexWrap: 'wrap',
                gap: 10,
              }}>
              {amenities?.map((amenity, index) => (
                <View
                  key={amenity.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <IconComponent
                    name={amenity.iconName}
                    library={amenity.library}
                    size={20}
                  />
                  <Text style={{color: '#000'}}>{amenity.name}</Text>
                </View>
              ))}
            </View>

            <Text style={{fontWeight: '700', color: COLORS.primary}}>
              Xem tất cả các tiện nghi
            </Text>
          </View>
        </View>

        {/* Bạn đang ở Genius Cấp 1 */}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.borderGray,
                borderRadius: 4,
                padding: 16,
                gap: 16,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Bạn đang ở Genius Cấp 1
              </Text>

              <View style={{gap: 10}}>
                <Text style={{color: COLORS.black}}>
                  Khả dụng cho một số lựa chọn:
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: COLORS.borderGray,
                    borderBottomWidth: 1,
                    paddingBottom: 16,
                  }}>
                  <IconComponent
                    name="checkcircle"
                    library="AntDesign"
                    size={20}
                    color={COLORS.yellowGold}
                  />
                  <View>
                    <Text style={{color: COLORS.black, fontWeight: '500'}}>
                      Giảm giá 12%
                    </Text>
                    <Text style={{fontSize: 12}}>
                      Áp dụng trên giá trước thuế và phí
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      flex: 1,
                    }}>
                    Chương trình khách hàng thân thiết của MNMQ.com
                  </Text>
                  <Image
                    source={{
                      uri: 'https://milesopedia.com/wp-content/uploads/2020/06/genius-booking-logo-e1593011246996.png',
                    }}
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 70,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Bạn có 1 đặt phòng chưa hoàn tất */}
        <View
          style={
            {
              // paddingHorizontal: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 16,
                borderWidth: 1,
                borderColor: COLORS.borderGray,
                borderRadius: 4,
                gap: 20,
              }}>
              <IconComponent
                name="clockcircleo"
                color={COLORS.green}
                library="AntDesign"
                size={20}
              />
              <View
                style={{
                  gap: 10,
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: COLORS.green,
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  Bạn có 1 đặt phòng chưa hoàn tất
                </Text>

                <Text style={{color: '#000'}}>
                  1 lựa chọn 1 đêm với giá VND 4.345.160
                </Text>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    alignSelf: 'flex-start',
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    gap: 10,
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Đặt ngay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Đánh ía của khách */}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 25,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Đánh giá của khách
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryDark,
                    padding: 6,
                    borderRadius: 5,
                    borderBottomLeftRadius: 0,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 16,
                    }}>
                    7.1
                  </Text>
                </View>
                <View style={{}}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: 16,
                    }}>
                    Tốt
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                    }}>
                    Xem tất cả 108 đánh giá
                  </Text>
                </View>
              </View>
              <View
                style={{
                  gap: 16,
                }}>
                <RatingBar rating={10} maxRating={10} title="Sạch sẽ" />
                <RatingBar rating={7.1} maxRating={10} title="Thoải mái" />
                <RatingBar rating={5} maxRating={10} title="Tiện nghi" />
                <RatingBar rating={7} maxRating={10} title="Địa điểm" />
                <RatingBar
                  rating={9}
                  maxRating={10}
                  title="Nhân viên phục vụ"
                />
                <RatingBar rating={4} maxRating={10} title="Đáng giá tiền" />
                <RatingBar rating={9} maxRating={10} title="Wifi miễn phí" />
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text style={{fontWeight: '700', color: COLORS.primary}}>
                  Xem thêm
                </Text>
                <IconComponent
                  name="unfold-more"
                  library="MaterialIcons"
                  color={COLORS.primary}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Khách lưu trú ở đây thích điều gì?*/}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 25,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Khách lưu trú ở đây thích điều gì?
              </Text>

              <View
                style={{
                  gap: 16,
                }}>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderColor: COLORS.borderGray,
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
                    }}>
                    <Image
                      source={{
                        uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
                      }}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between', // Phân bổ không gian giữa tên và cờ
                        flex: 1, // Chiếm toàn bộ không gian còn lại
                        height: 35, // Chiều cao bằng với hình ảnh avatar
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        Nga - Cặp đôi
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image
                          source={{
                            uri: 'https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%208/Ng%C3%A0y_31/Nga/quockyvietnam-copy-7814.jpg',
                          }}
                          style={{height: 10, width: 15}}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            color: COLORS.black,
                            fontWeight: '400',
                            fontSize: 12,
                          }}>
                          Việt Nam
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: COLORS.black,
                      lineHeight: 22,
                      fontSize: 16,
                    }}>
                    Phòng mình đặt sạch sẽ, thoáng có view nhà lồng siêu đẹp,
                    phía dưới ks có khá nhiều quán nổi tiếng thuận tiện
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderColor: COLORS.borderGray,
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
                    }}>
                    <Image
                      source={{
                        uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
                      }}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between', // Phân bổ không gian giữa tên và cờ
                        flex: 1, // Chiếm toàn bộ không gian còn lại
                        height: 35, // Chiều cao bằng với hình ảnh avatar
                      }}>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        Nga - Cặp đôi
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image
                          source={{
                            uri: 'https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%208/Ng%C3%A0y_31/Nga/quockyvietnam-copy-7814.jpg',
                          }}
                          style={{height: 10, width: 15}}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            color: COLORS.black,
                            fontWeight: '400',
                            fontSize: 12,
                          }}>
                          Việt Nam
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: COLORS.black,
                      lineHeight: 22,
                      fontSize: 16,
                    }}>
                    Phòng mình đặt sạch sẽ, thoáng có view nhà lồng siêu đẹp,
                    phía dưới ks có khá nhiều quán nổi tiếng thuận tiện
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 16,
                    borderBottomWidth: 1,
                    borderColor: COLORS.borderGray,
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
                    }}>
                    <Image
                      source={{
                        uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
                      }}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between', // Phân bổ không gian giữa tên và cờ
                        flex: 1, // Chiếm toàn bộ không gian còn lại
                        height: 35, // Chiều cao bằng với hình ảnh avatar
                      }}>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        Nga - Cặp đôi
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image
                          source={{
                            uri: 'https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%208/Ng%C3%A0y_31/Nga/quockyvietnam-copy-7814.jpg',
                          }}
                          style={{height: 10, width: 15}}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            color: COLORS.black,
                            fontWeight: '400',
                            fontSize: 12,
                          }}>
                          Việt Nam
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: COLORS.black,
                      lineHeight: 22,
                      fontSize: 16,
                    }}>
                    Phòng mình đặt sạch sẽ, thoáng có view nhà lồng siêu đẹp,
                    phía dưới ks có khá nhiều quán nổi tiếng thuận tiện
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 16,
                    // borderBottomWidth: 1,
                    // borderColor: '#E5E5E5',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
                    }}>
                    <Image
                      source={{
                        uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
                      }}
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 100,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between', // Phân bổ không gian giữa tên và cờ
                        flex: 1, // Chiếm toàn bộ không gian còn lại
                        height: 35, // Chiều cao bằng với hình ảnh avatar
                      }}>
                      <Text
                        style={{
                          color: COLORS.black,
                          fontWeight: '700',
                          fontSize: 13,
                        }}>
                        Nga - Cặp đôi
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <Image
                          source={{
                            uri: 'https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%208/Ng%C3%A0y_31/Nga/quockyvietnam-copy-7814.jpg',
                          }}
                          style={{height: 10, width: 15}}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            color: COLORS.black,
                            fontWeight: '400',
                            fontSize: 12,
                          }}>
                          Việt Nam
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: COLORS.black,
                      lineHeight: 22,
                      fontSize: 16,
                    }}>
                    Phòng mình đặt sạch sẽ, thoáng có view nhà lồng siêu đẹp,
                    phía dưới ks có khá nhiều quán nổi tiếng thuận tiện
                  </Text>

                  <Text style={{fontWeight: '700', color: COLORS.primary}}>
                    Xem tất cả 102 đánh giá
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Thắc mắc của du khách */}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 18,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Thắc mắc của du khách
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
                  }}>
                  <IconComponent
                    name="chatbubbles-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: '500',
                    }}>
                    Can we check in now
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F8F8F8',
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                    }}>
                    18 thg 1 2025
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                    }}>
                    Can we check in now
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text style={{fontWeight: '700', color: COLORS.primary}}>
                  Xem tất cả 4 câu hỏi
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  gap: 5,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    gap: 10,
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Đặt câu hỏi
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.black,
                    fontSize: 12,
                  }}>
                  Chỗ nghỉ này thường trả lời trong vòng vài ngày
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Miêu tả */}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 18,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Miêu tả
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.black,
                    lineHeight: 22,
                  }}>
                  Nằm ở Đà Lạt, cách Vườn hoa Đà Lạt 2.8 km, Akama Boutique Đà
                  Lạt cung cấp chỗ nghỉ có khu vườn, chỗ đậu xe riêng miễn phí,
                  phòng chờ chung và sân hiện. Chỗ nghỉ này có các tiện nghi như
                  nhà hàng, bếp chung và dịch vụ phòng, cùng wifi, ...
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: COLORS.primary,
                  }}>
                  Đọc miêu tả đầy đủ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Chính sách */}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 16,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                Chính sách
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View>
                  <Text
                    style={{
                      color: COLORS.black,
                    }}>
                    Nhận phòng từ 14:00 đến 23:00
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                    }}>
                    Trả phòng từ 08:00 đến 12:00
                  </Text>
                </View>
                <View style={{gap: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        backgroundColor: COLORS.green,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                        color: COLORS.white,
                        fontSize: 12,
                      }}>
                      Miễn phí
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}>
                      Wifi có ở toàn bộ khách sạn và miễn phí
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        backgroundColor: COLORS.green,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                        color: COLORS.white,
                        fontSize: 12,
                      }}>
                      Miễn phí
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        flex: 1,
                      }}>
                      Có chỗ đỗ xe riêng miễn phí tại chỗ (không cần đặt chộ
                      trước).
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Text
                      style={{
                        color: COLORS.black,
                        flex: 1,
                      }}>
                      Không phí đặt phòng hoặc phí thẻ tín dụng
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: COLORS.primary,
                  }}>
                  Xem chính sách chỗ nghỉ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Trẻ em và giường phụ */}
        <View
          style={
            {
              // padding: 16,
            }
          }>
          <View
            style={{
              borderTopColor: COLORS.borderGray,
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 16,
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 20,
                  fontWeight: '700',
                }}>
                Trẻ em và giường phụ
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View style={{gap: 5}}>
                  <Text
                    style={{
                      color: COLORS.black,
                    }}>
                    Phù hợp cho tất cả trẻ em.
                  </Text>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontWeight: '600',
                      lineHeight: 18,
                    }}>
                    Để xem thông tin giá và tình trạng phòng trống chính xác,
                    vui lòng thêm số lượng và độ tuổi của trẻ em trong nhóm của
                    bạn khi tìm kiếm.
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: COLORS.primary,
                  }}>
                  Xem toàn bộ chính sách
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
          // Shadow properties
          shadowColor: COLORS.black, // Màu của shadow
          shadowOffset: {width: 0, height: -5}, // Đổ bóng phía trên (height âm)
          shadowOpacity: 0.2, // Độ trong suốt của shadow
          shadowRadius: 3, // Độ mờ của shadow
          elevation: 10, // Hỗ trợ shadow trên Android
        }}>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: pressed ? COLORS.primaryLight : COLORS.primary,
              width: '100%',
              gap: 10,
              borderRadius: 3,
            },
          ]}
          onPress={() => {
            navigation.navigate('RoomList', {
              hotelId,
              ...searchCondition,
            });
          }}>
          <Text style={{color: COLORS.white, fontSize: 16, fontWeight: '500'}}>
            Chọn phòng
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
    // padding: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  image: {
    height: 130,
    flex: 1,
  },
  overlayContainer: {
    position: 'relative',
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.opacityDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

HotelDetailScreen.propTypes = {};

export default HotelDetailScreen;
