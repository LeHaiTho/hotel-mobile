import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import IconComponent from '@components/IconComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReservationDetailScreen = () => {
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
              color: '#058633',
            }}>
            Đã xác nhận
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
              letho11112002@gmail.com{' '}
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
              The Sóng 5 Start Apartment - Tokyo Homestay
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
                    12 thg 2 2025 - 26 thg 4 2025
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Nhận phòng: từ 14:00 đến 00:00
                  </Text>
                  <Text
                    style={{
                      color: '#000',
                    }}>
                    Trả phòng: từ 14:00 đến 00:00
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
                      Thay đổi ngày
                    </Text>
                  </TouchableOpacity>
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
                    }}>
                    26/63 Street 518, Ha Noi Highway, Quarter 5, Tan Hiep Ward,
                    Bien Hoa City, Biên Hòa, Việt Nam{' '}
                    <TouchableOpacity style={{}}>
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
                      Gọi +84 909 090 909
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
                    <Text>Lê Nhật An - 2 người lớn</Text>
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
                      Miễn phí hủy đến 18:00 11 tháng 2
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
                    <Text style={{color: '#000'}}>Chỗ đậu xe</Text>
                    <Text style={{color: '#000'}}>Chỗ đậu xe</Text>
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
                VND 615.160
              </Text>
            </View>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
              Thanh toán được xử lý bởi chỗ nghỉ
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReservationDetailScreen;
