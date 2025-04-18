import {COLORS} from '@styles/colors';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ChangeDateConfirmScreen = () => {
  return (
    <>
      {/* <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          padding: 16,
          gap: 16,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: COLORS.black}}>
          Kiểm tra và xác nhận
        </Text>
        <Text style={{color: COLORS.black, lineHeight: 22}}>
          Tin vui! Chúng tôi có thể đổi ngày cho kỳ nghỉ của bạn. Hãy kiểm tra
          thông tin thay đổi bên dưới. Chúng tôi sẽ cập nhật đơn đặt sau khi bạn
          xác nhận.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            backgroundColor: COLORS.white,
            padding: 10,
            borderRadius: 5,
            shadowColor: COLORS.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 3.2,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Image
            source={{
              uri: 'https://thudaumot.becamexhotels.com/wp-content/uploads/sites/3/2020/10/thudaumot.jpg',
            }}
            style={{width: 50, height: 50, borderRadius: 4}}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Khách sạn cúc phương
            </Text>
            <Text style={{color: COLORS.black, fontSize: 14}}>1 lựa chọn</Text>
          </View>
        </View>
        <View style={{gap: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: COLORS.black}}>
            Ngày mới
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, gap: 5}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: COLORS.black,
                }}>
                Nhận phòng
              </Text>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: COLORS.gray,
                }}>
                20/04/2025
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                20/04/2025
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                }}>
                từ 12:00 đến 12:00
              </Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.gray,
                width: 0.5,
                height: '100%',
              }}></View>
            <View style={{flex: 1, gap: 5}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: COLORS.black,
                }}>
                Nhận phòng
              </Text>
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: COLORS.gray,
                }}>
                20/04/2025
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                20/04/2025
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                }}>
                từ 12:00 đến 12:00
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: '500',
              color: COLORS.black,
              fontSize: 18,
              marginTop: 10,
            }}>
            Chi tiết giá
          </Text>
          <View style={{gap: 10, marginTop: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                }}>
                Giá ban đầu
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  textDecorationLine: 'line-through',
                }}>
                VNĐ 1.000.000
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                }}>
                Giá ban đầu
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                }}>
                VNĐ 1.000.000
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={() => {}}>
          <Text style={styles.checkButtonText}>Đồng ý thực hiện thay đổi</Text>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          padding: 16,
          gap: 16,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: COLORS.black}}>
          Đơn đặt của bạn dã được cập nhật thành công
        </Text>
        <Text style={{color: COLORS.black, lineHeight: 22}}>
          Chúng tôi đã gửi email xác nhận đến 2024802010322@student.tdmu.edu.vn.
          Chúc bạn một kỳ nghĩ vui vẻ!
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -15},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#0165FC',
    width: '100%',
    gap: 10,
    borderRadius: 3,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default ChangeDateConfirmScreen;
