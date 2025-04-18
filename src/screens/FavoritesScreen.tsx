import React from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {COLORS} from '@styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const FavoritesScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.white,
          paddingVertical: 16,
        }}>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
            },
          ]}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              gap: 5,
              marginHorizontal: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.grayLight,
              paddingRight: 16,
            }}>
            <View style={{flexDirection: 'column', gap: 4}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Bến Cát
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <AntDesign name="heart" size={14} color={COLORS.red} />
                <Text style={{color: COLORS.gray}}>0 mục đã lưu </Text>
              </View>
            </View>
            <Entypo name="dots-three-vertical" size={14} color={COLORS.black} />
          </View>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
            },
          ]}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              gap: 5,
              marginHorizontal: 16,
              paddingRight: 16,
              paddingVertical: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.grayLight,
            }}>
            <View style={{flexDirection: 'column', gap: 4}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Bến Cát
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <AntDesign name="heart" size={14} color={COLORS.red} />
                <Text style={{color: COLORS.gray}}>0 mục đã lưu </Text>
              </View>
            </View>
            <Entypo name="dots-three-vertical" size={14} color={COLORS.black} />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
