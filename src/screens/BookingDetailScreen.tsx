import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IconComponent} from '@components/index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const BookingDetailScreen = () => {
  return (
    <>
      <ScrollView contentContainerStyle={{padding: 16}}>
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
                Bạn sẽ thanh toán khi đến nghỉ.
              </Text>
            </View>
          </View>
        </View>

        {/* Thông tin phòng + nhận trả phòng */}
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            padding: 16,
            borderWidth: 1,
            borderColor: '#E5E5E5',
            borderRadius: 8,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '700',
                flex: 1,
              }}>
              The Sóng 5 Start Apartment - Tokyo Homestay
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
            }}>
            <IconComponent
              name="star"
              color="#FFB700"
              library="AntDesign"
              size={20}
            />
            <IconComponent
              name="star"
              color="#FFB700"
              library="AntDesign"
              size={20}
            />

            <IconComponent
              name="star"
              color="#FFB700"
              library="AntDe"
              size={20}
            />
          </View>
          <Text style={{color: '#000', fontWeight: '400'}} numberOfLines={2}>
            28 Đường Thi Sách, 790000 Vũng Tàu, Việt Nam
          </Text>
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
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5',
              marginVertical: 10,
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* Nhận phòng */}
            <View>
              <Text>Nhận phòng</Text>
              <Text>Th 3, 11 thg 2, 2025</Text>
            </View>

            {/* Trả phòng */}
            <View
              style={{
                paddingHorizontal: 16,
                borderLeftWidth: 1,
                borderColor: '#E5E5E5',
              }}>
              <Text>Trả phòng</Text>

              <Text>Th 3, 11 thg 2, 2025</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5',
              marginVertical: 10,
            }}
          />
          <View>
            <Text>Bạn đã chọn</Text>
            <Text>1 đêm, 1 căn hộ cho 2 người lớn</Text>
          </View>
        </TouchableOpacity>

        {/* Gía gốc */}
        <View
          style={{
            flexDirection: 'column',
            padding: 16,
            borderWidth: 1,
            borderColor: '#E5E5E5',
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Giá gốc</Text>
            <Text>VND 1.183.000</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Ưu Đãi Trong Thời Gian Có Hạn</Text>
            <Text>VND 1.183.000</Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5',
              marginVertical: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Giá</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
              }}>
              <Text>VND 1.183.000</Text>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text> VND 683.000</Text>
                <Text>Đã bao gồm thuế và phí</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text>Điểm nổi bật</Text>
          <View style={{flexDirection: 'row', gap: 5}}>
            <IconComponent
              name="star"
              color="#FFB700"
              library="AntDesign"
              size={20}
            />
            <View style={{flexDirection: 'column'}}>
              <Text>Phòng có không gian rộng, thoáng mát</Text>
              <Text>Dựa trên 2 đánh giá</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#E5E5E5',
              marginVertical: 10,
            }}
          />
          {/* Chính sách hủy */}
          <View>
            <Text>Chính sách hủy</Text>
            <View>
              <View style={{flexDirection: 'row', gap: 5}}>
                <IconComponent
                  name="close"
                  color="#000"
                  library="MaterialCommunityIcons"
                  size={20}
                />
                <Text>Hủy miễn phí trước 18:00 ngày 11 thg 2, 2025</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 5}}>
                <IconComponent
                  name="close"
                  color="#000"
                  library="MaterialCommunityIcons"
                  size={20}
                />
                <Text>Hủy miễn phí trước 18:00 ngày 11 thg 2, 2025</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text>Điều kiện đặt phòng</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: 1, backgroundColor: '#E5E5E5', marginVertical: 10}}
          />
          {/* Chương trình Genius */}
          <View>
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
                    Đơn đặt này sẽ được tính
                  </Text>

                  <View style={{gap: 10}}>
                    <Text style={{color: '#000'}}>
                      Khả dụng cho một số lựa chọn:
                    </Text>

                    <Text>
                      Chỗ nghỉ, vé máy bay, xe thuê, taxi hay vé tham quan, mỗi
                      đơn đặt hoàn tất đề được tính vào tiến trình Genius của
                      bạn
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#000',
                          fontWeight: '500',
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
          </View>
        </View>
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
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text
              style={{
                textDecorationLine: 'line-through',
                color: '#f20000',
                fontWeight: 'bold',
              }}>
              VND 1.520.000
            </Text>
            <Text style={{color: '#000', fontWeight: 'bold'}}>
              VND 1.026.000
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
            }}>
            + VND 78.171 bao gồm thuế và phí
          </Text>
        </View>

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

export default BookingDetailScreen;

const styles = StyleSheet.create({});
