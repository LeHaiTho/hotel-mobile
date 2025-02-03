import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {IconComponent, ImageGrid, RatingBar} from '../components/index';

const images = [
  {
    id: 1,
    uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
  },
  {
    id: 2,
    uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
  },
  {
    id: 3,
    uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
  },
  {
    id: 4,
    uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
  },
  {
    id: 5,
    uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/503753216.jpg?k=1de737ea2d6dd66b851171bd154d27e021b84fe6b07728bd27c0c3dfc81577bd&o=',
  },
];

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
const remainingCount = 43;
const HotelDetailScreen = () => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
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
              color: '#000',
              flex: 1,
            }}>
            KT MERAKI BOUTIQUE - Bui vien walking street
          </Text>
          <View
            style={{
              backgroundColor: '#003b95',
              padding: 4,
              borderRadius: 5,
              borderBottomLeftRadius: 0,
              alignSelf: 'flex-start',
            }}>
            <Text
              style={{
                color: '#fff',
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
            <AntDesign name="star" color="#FFB700" size={20} />
            <AntDesign name="star" color="#FFB700" size={20} />
            <AntDesign name="star" color="#FFB700" size={20} />
          </View>
          <View
            style={{
              backgroundColor: '#FFB700',
              paddingHorizontal: 4,
              paddingVertical: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              gap: 5,
            }}>
            <AntDesign name="like1" color="#fff" size={14} />
            <FontAwesome5 name="plus" color="#fff" size={12} />
          </View>
        </View>

        {/* khung ảnh*/}
        <View style={styles.container}>
          {/* Hàng 1 */}
          <View style={styles.row}>
            {images.slice(0, 2).map(image => (
              <Image
                key={image.id}
                source={{uri: image.uri}}
                style={styles.image}
              />
            ))}
          </View>

          {/* Hàng 2 */}
          <View style={styles.row}>
            {images.slice(2, 4).map(image => (
              <Image
                key={image.id}
                source={{uri: image.uri}}
                style={styles.image}
              />
            ))}

            {/* Ảnh cuối cùng có hiệu ứng đen mờ */}
            <View style={styles.overlayContainer}>
              <Image source={{uri: images[4].uri}} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>+{remainingCount}</Text>
              </View>
            </View>
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
                    backgroundColor: '#E5E5E5',
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
                    color="#666666"
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#000',
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
                  color: '#000',
                  fontWeight: '500',
                }}>
                Nhận phòng
              </Text>
              <Text style={{fontWeight: '700', color: '#0165FC'}}>
                Th 7, 25 thg 1
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '500',
                }}>
                Trả phòng
              </Text>
              <Text style={{fontWeight: '700', color: '#0165FC'}}>
                Th 7, 25 thg 1
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Số lượng phòng và khách
            </Text>
            <Text style={{fontWeight: '700', color: '#0165FC'}}>
              1 phòng, 2 người lớn, 0 trẻ em
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
              Giá cho 6 đêm, 2 người lớn
            </Text>
            <Text
              style={{
                color: '#000',
                fontWeight: '700',
                fontSize: 20,
              }}>
              VND 2.721.627
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}>
              Đã bao gồm thuế và phí
            </Text>
          </View>
          <IconComponent
            name="right"
            library="AntDesign"
            size={18}
            color="#666666"
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
              borderColor: '#E5E5E5',
              borderRadius: 8,
              gap: 20,
            }}>
            <IconComponent
              name="credit-card-off-outline"
              color="#387053"
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
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Không cần thẻ tín dụng
              </Text>
              <Text
                style={{
                  color: '#000',
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <Text
              style={{
                color: '#000',
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
                color: '#000',
              }}>
              176 Đường Bùi Viện, Quận 1, TP.Hồ Chí Minh, Việt Nam - 0,9 km từ
              trung tâm -{' '}
              <Text
                style={{
                  color: '#058633',
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingVertical: 16,
            }}>
            <Text
              style={{
                color: '#000',
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

            <Text style={{fontWeight: '700', color: '#0165FC'}}>
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E5E5E5',
                borderRadius: 4,
                padding: 16,
                gap: 16,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Bạn đang ở Genius Cấp 1
              </Text>

              <View style={{gap: 10}}>
                <Text style={{color: '#000'}}>
                  Khả dụng cho một số lựa chọn:
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    borderBottomColor: '#E5E5E5',
                    borderBottomWidth: 1,
                    paddingBottom: 16,
                  }}>
                  <IconComponent
                    name="checkcircle"
                    library="AntDesign"
                    size={20}
                    color="#FFB700"
                  />
                  <View>
                    <Text style={{color: '#000', fontWeight: '500'}}>
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 16,
                borderWidth: 1,
                borderColor: '#E5E5E5',
                borderRadius: 4,
                gap: 20,
              }}>
              <IconComponent
                name="clockcircleo"
                color="#058633"
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
                    color: '#058633',
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
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#0165FC',
                    gap: 10,
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
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
              borderTopColor: '#E5E5E5',
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
                Đánh giá của khách
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View
                  style={{
                    backgroundColor: '#003b95',
                    padding: 6,
                    borderRadius: 5,
                    borderBottomLeftRadius: 0,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
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
                <Text style={{fontWeight: '700', color: '#0165FC'}}>
                  Xem thêm
                </Text>
                <IconComponent
                  name="unfold-more"
                  library="MaterialIcons"
                  color="#0165FC"
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
              borderTopColor: '#E5E5E5',
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
                    borderColor: '#E5E5E5',
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
                            color: '#000',
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
                      color: '#000',
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
                    borderColor: '#E5E5E5',
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
                            color: '#000',
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
                      color: '#000',
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
                    borderColor: '#E5E5E5',
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
                            color: '#000',
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
                      color: '#000',
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
                            color: '#000',
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
                      color: '#000',
                      lineHeight: 22,
                      fontSize: 16,
                    }}>
                    Phòng mình đặt sạch sẽ, thoáng có view nhà lồng siêu đẹp,
                    phía dưới ks có khá nhiều quán nổi tiếng thuận tiện
                  </Text>

                  <Text style={{fontWeight: '700', color: '#0165FC'}}>
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 18,
              }}>
              <Text
                style={{
                  color: '#000',
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
                      color: '#000',
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
                      color: '#000',
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
                <Text style={{fontWeight: '700', color: '#0165FC'}}>
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
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#0165FC',
                    gap: 10,
                    borderRadius: 3,
                  }}>
                  <Text
                    style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                    Đặt câu hỏi
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 18,
              }}>
              <Text
                style={{
                  color: '#000',
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
                    color: '#000',
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
                  style={{fontWeight: '600', fontSize: 16, color: '#0165FC'}}>
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 16,
              }}>
              <Text
                style={{
                  color: '#000',
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
                      color: '#000',
                    }}>
                    Nhận phòng từ 14:00 đến 23:00
                  </Text>
                  <Text
                    style={{
                      color: '#000',
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
                        backgroundColor: '#058633',
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                        color: '#fff',
                        fontSize: 12,
                      }}>
                      Miễn phí
                    </Text>
                    <Text
                      style={{
                        color: '#000',
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
                        backgroundColor: '#058633',
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                        color: '#fff',
                        fontSize: 12,
                      }}>
                      Miễn phí
                    </Text>
                    <Text
                      style={{
                        color: '#000',
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
                        color: '#000',
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
                  style={{fontWeight: '600', fontSize: 16, color: '#0165FC'}}>
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
              borderTopColor: '#E5E5E5',
              borderTopWidth: 1,
              paddingTop: 16,
            }}>
            <View
              style={{
                gap: 16,
              }}>
              <Text
                style={{
                  color: '#000',
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
                      color: '#000',
                    }}>
                    Phù hợp cho tất cả trẻ em.
                  </Text>
                  <Text
                    style={{
                      color: '#000',
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
                  style={{fontWeight: '600', fontSize: 16, color: '#0165FC'}}>
                  Xem toàn bộ chính sách
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          // Shadow properties
          shadowColor: '#000', // Màu của shadow
          shadowOffset: {width: 0, height: -5}, // Đổ bóng phía trên (height âm)
          shadowOpacity: 0.2, // Độ trong suốt của shadow
          shadowRadius: 3, // Độ mờ của shadow
          elevation: 10, // Hỗ trợ shadow trên Android
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#0165FC',
            width: '100%',
            gap: 10,
            borderRadius: 3,
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Chọn phòng
          </Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

HotelDetailScreen.propTypes = {};

export default HotelDetailScreen;
