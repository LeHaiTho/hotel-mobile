import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import IconComponent from '@components/IconComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import authStore from '@stores/authStore';
import {formatDate} from '@utils/constants';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@styles/colors';

const ReservationDetailScreen = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const {user} = authStore();
  const {infoBooking} = route.params || {};
  console.log(infoBooking?.status, infoBooking?.payment_method);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: 16,
          gap: 25,
        }}>
        <View style={{gap: 10}}>
          <Text
            style={{
              color:
                infoBooking?.status === 'CANCELLED'
                  ? '#FF0000'
                  : infoBooking?.status === 'PENDING'
                  ? '#058633'
                  : '#000',
            }}>
            {infoBooking?.status === 'CANCELLED'
              ? 'Đã hủy'
              : infoBooking?.status === 'PENDING'
              ? 'Đã xác nhận'
              : 'Đang hoàn thành'}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Đặt chỗ của bạn đã được xác nhận
          </Text>
          <Text
            style={{
              color: '#000',
              lineHeight: 20,
            }}>
            Mọi thứ xong xuôi! Chúng tôi đã gửi email xác nhận đến{' '}
            <Text
              style={{
                fontWeight: '700',
              }}>
              {user?.email}{' '}
              <Text
                style={{
                  color: '#0165FC',
                  fontWeight: '500',
                }}>
                Cập nhật và gửi lại
              </Text>
            </Text>
          </Text>
        </View>
        <View style={{gap: 18}}>
          <View>
            <Text
              style={{
                color: '#0165FC',
                fontSize: 20,
                fontWeight: '700',
                lineHeight: 30,
              }}>
              {infoBooking?.Hotel?.name}
            </Text>

            {/* rating */}

            {/* Chi tiết thông tin phòng */}
            <View style={{padding: 8, gap: 16}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent name="calendar" library="AntDesign" size={20} />
                <View style={{gap: 4}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    {formatDate(infoBooking?.checkin_date, true)} -{' '}
                    {formatDate(infoBooking?.checkout_date, true)}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Nhận phòng: từ {infoBooking?.Hotel?.checkinfrom} đến{' '}
                    {infoBooking?.Hotel?.checkinto}
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Trả phòng: từ {infoBooking?.Hotel?.checkoutfrom} đến{' '}
                    {infoBooking?.Hotel?.checkoutto}
                  </Text>

                  <Pressable
                    style={({pressed}) => [
                      {
                        paddingVertical: 10,
                        backgroundColor: pressed
                          ? COLORS.grayLight
                          : 'transparent',
                        alignSelf: 'flex-start',
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate('AdjustBookingDate', {
                        infoBooking,
                      });
                    }}>
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Thay đổi ngày
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent
                  name="location-pin"
                  library="SimpleLineIcons"
                  size={20}
                />
                <View style={{gap: 4, flex: 1}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    Địa chỉ chỗ nghỉ
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                      flex: 1,
                    }}>
                    {infoBooking?.Hotel?.address}
                    <TouchableOpacity style={{flex: 1}}>
                      <IconComponent
                        name="content-copy"
                        library="MaterialCommunityIcons"
                        size={20}
                        color="#0165FC"
                      />
                    </TouchableOpacity>
                  </Text>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Xem đường đi
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent
                  name="bed-outline"
                  library="Ionicons"
                  size={20}
                  color="#000"
                />
                <View style={{gap: 4, flex: 1}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    Tiện nghi và chính sách chỗ nghỉ
                  </Text>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Xem tất cả
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#ccc',
            }}></View>
          <View style={{gap: 16}}>
            <Text
              style={{
                color: '#000',
                fontWeight: '700',
                fontSize: 20,
              }}>
              Liên hệ chỗ nghỉ
            </Text>
            <Text
              style={{
                color: '#000',
              }}>
              Trao đổi về các thay đổi đặt phòng hoặc hỏi về thanh toán và hoàn
              tiền
            </Text>
            <View style={{padding: 8, gap: 16}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent
                  name="chatbubbles-outline"
                  library="Ionicons"
                  size={20}
                  color="#000"
                />
                <View style={{gap: 4, flex: 1}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    Nhắn tin cho chỗ nghỉ
                  </Text>

                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Gửi tin nhắn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconComponent
                  name="phone"
                  library="SimpleLineIcons"
                  size={20}
                  color="#000"
                />
                <View style={{gap: 4, flex: 1}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#000',
                    }}>
                    Phương thức khác
                  </Text>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Gọi +84 {infoBooking?.Hotel?.User?.phonenumber}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
                      Gửi tin nhắn
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#ccc',
            }}></View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#0165FC',
              width: '100%',
              gap: 10,
              borderRadius: 3,
            }}
            onPress={() => {
              navigation.navigate('BookingManagement', {
                infoBooking,
              });
            }}>
            <Text style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
              Quản lý đặt phòng
            </Text>
          </TouchableOpacity>
          <View style={{gap: 16}}>
            <Text style={{color: '#000', fontSize: 20, fontWeight: '700'}}>
              Bạn đã đặt 1 căn hộ
            </Text>
            <View style={{gap: 10}}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: 'bold'}}>
                Căn hộ studio có Ban Công
              </Text>
              <View style={{gap: 14}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconComponent
                    name="user"
                    library="AntDesign"
                    size={20}
                    color="#000"
                  />
                  <View>
                    <Text>Khách</Text>
                    <Text>
                      {user?.name} - {infoBooking?.total_adult} người lớn
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconComponent
                    name="check"
                    library="Feather"
                    size={20}
                    color="#058633"
                  />
                  <View
                    style={{
                      flex: 1,
                      gap: 4,
                    }}>
                    <Text
                      style={{
                        color: '#058633',
                        fontWeight: 'bold',
                      }}>
                      Miễn phí hủy
                    </Text>
                    <Text style={{color: '#000', lineHeight: 20}}>
                      Bạn có thể hủy phòng miễn phí đến 18:00 ngày nhận phòng.
                      Bạn sẽ phải trả toàn bộ tiền phòng nếu bạn hủy sau 18:00
                      ngày nhận phòng. Nếu bạn vắng mặt, phí vắng mặt sẽ bằng
                      với phí hủy.
                    </Text>
                    <Text style={{color: '#000', fontSize: 12}}>
                      (Các thời hạn hủy miễn phí được tính theo múi giờ của chỗ
                      nghỉ)
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <IconComponent
                    name="plus"
                    library="SimpleLineIcons"
                    size={20}
                    color="#000"
                  />
                  <View style={{gap: 4}}>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Quyền lợi bao gồm
                    </Text>
                    <Text style={{color: '#000'}}>Chỗ đậu xe</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: '#0165FC',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Xem chi tiết căn hộ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#ccc',
            }}></View>
          <View style={{gap: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Tổng giá
              </Text>
              <Text
                style={{color: '#058633', fontSize: 22, fontWeight: 'bold'}}>
                {Number(infoBooking?.total_price).toLocaleString('vi-VN')} VNĐ
              </Text>
            </View>
            {infoBooking?.status === 'PENDING' &&
              infoBooking?.payment_method === 'CASH' && (
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  Thanh toán được xử lý bởi chỗ nghỉ
                </Text>
              )}
            {infoBooking?.status === 'PENDING' &&
              infoBooking?.payment_method === 'CREDIT_CARD' &&
              infoBooking?.is_paid === true && (
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  Đã thanh toán
                </Text>
              )}
            {infoBooking?.status === 'PENDING' &&
              infoBooking?.payment_method === 'CREDIT_CARD' &&
              infoBooking?.is_paid === false && (
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  Chưa thanh toán
                </Text>
              )}
            {infoBooking?.status === 'CONFIRMED' &&
              infoBooking?.is_paid === true && (
                <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                  Đã đến chỗ nghỉ
                </Text>
              )}
            {infoBooking?.status === 'CANCELLED' && (
              <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
                Đã hủy
              </Text>
            )}
            <TouchableOpacity
              style={{
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  color: '#0165FC',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Thông tin về giá
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReservationDetailScreen;
