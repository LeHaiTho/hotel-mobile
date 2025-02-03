import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import IconComponent from '@components/IconComponent';
import {IconLibrary, IconType} from 'src/types/iconType';
import {getIcon} from '@utils/iconUtils';

// amenities: wifi, sân tennis, sân bóng đá, tủ lạnh, kitchen,...

interface AmenityItem {
  id: number;
  name: string;
  icon: IconType;
}
const amenities: AmenityItem[] = [
  {
    id: 1,
    name: 'Wifi miễn phí',
    icon: {
      name: 'wifi',
      library: 'AntDesign',
    },
  },
  {
    id: 2,
    name: 'Ban công',
    icon: {
      name: 'balcony',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 3,
    name: 'Nhìn ra vườn',
    icon: {
      name: 'wifi',
      library: 'AntDesign',
    },
  },
  {
    id: 4,
    name: 'Nhìn ra thành phố',
    icon: {
      name: 'snowflake',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 5,
    name: 'Phòng tắm riêng trong phòng',
    icon: {
      name: 'shower',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 6,
    name: 'TV màn hình phẳng',
    icon: {
      name: 'television',
      library: 'FontAwesome',
    },
  },
];
const RoomListScreen = () => {
  return (
    <>
      <ScrollView contentContainerStyle={{padding: 10, gap: 10}}>
        {/* Radio button */}

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, gap: 10}}>
              <Text
                style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Phòng Giường Đôi Có Ban Công
              </Text>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    1 giường đôi
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Diện tích: 21 m2
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
              style={{width: 60, height: 60, borderRadius: 5}}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {amenities?.map(item => (
              <View
                key={item.id}
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
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
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, gap: 10}}>
              <Text
                style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Phòng Giường Đôi Có Ban Công
              </Text>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    1 giường đôi
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Diện tích: 21 m2
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
              style={{width: 60, height: 60, borderRadius: 5}}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {amenities?.map(item => (
              <View
                key={item.id}
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
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
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, gap: 10}}>
              <Text
                style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Phòng Giường Đôi Có Ban Công
              </Text>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    1 giường đôi
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Diện tích: 21 m2
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
              style={{width: 60, height: 60, borderRadius: 5}}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {amenities?.map(item => (
              <View
                key={item.id}
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
                <IconComponent
                  name="infocirlceo"
                  library="AntDesign"
                  size={18}
                  color="#0165FC"
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
              {/* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#0165FC',
                  gap: 10,
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity> */}
              <View style={{flexDirection: 'row', gap: 10}}>
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
                    flex: 1,
                  }}>
                  <Text
                    style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                    1 phòng
                  </Text>
                  <IconComponent
                    name="angle-down"
                    library="FontAwesome"
                    size={18}
                    color="#0165FC"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#F20000',
                    gap: 10,
                  }}>
                  <IconComponent
                    name="delete"
                    library="AntDesign"
                    size={20}
                    color="#F20000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          // Shadow properties
          shadowColor: '#000', // Màu của shadow
          shadowOffset: {width: 0, height: -15}, // Đổ bóng phía trên (height âm)
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
            Đặt ngay
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RoomListScreen;
