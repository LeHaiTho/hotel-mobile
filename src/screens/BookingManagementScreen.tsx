import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '@styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

const BookingManagementScreen = () => {
  return (
    <View
      style={{flex: 1, gap: 16, backgroundColor: COLORS.white, padding: 16}}>
      <Text style={{fontSize: 22, fontWeight: 'bold', color: COLORS.black}}>
        Quản lý đặt phòng
      </Text>
      <View style={{gap: 10}}>
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
                color: COLORS.black,
                fontWeight: '500',
                fontSize: 16,
              }}>
              20/04/2025
            </Text>
            <Text
              style={{
                color: COLORS.black,
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
                color: COLORS.black,
                fontWeight: '500',
                fontSize: 16,
              }}>
              20/04/2025
            </Text>
            <Text
              style={{
                color: COLORS.black,
              }}>
              từ 12:00 đến 12:00
            </Text>
          </View>
        </View>
      </View>
      <View style={{gap: 16}}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 12,
            borderRadius: 3,
            alignItems: 'center',
          }}>
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 16}}>
            Thay đổi ngày tháng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            borderRadius: 3,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: COLORS.red,
            flexDirection: 'row',
            gap: 10,
          }}>
          <AntDesign name="close" size={24} color={COLORS.red} />
          <Text style={{color: COLORS.red, fontWeight: '500', fontSize: 16}}>
            Hủy đặt phòng
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{gap: 10}}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Fontisto name="email" size={24} color={COLORS.primary} />
          <Text
            style={{color: COLORS.primary, fontWeight: '500', fontSize: 16}}>
            Gửi lại email xác nhận
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Fontisto name="email" size={24} color={COLORS.primary} />
          <Text
            style={{color: COLORS.primary, fontWeight: '500', fontSize: 16}}>
            Cập nhật địa chỉ email
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingManagementScreen;

const styles = StyleSheet.create({});
