import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '@styles/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const ReviewScreen = () => {
  const navigation = useNavigation<any>();

  const handleReview = () => {
    navigation.navigate('Step1Review');
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Pressable
        style={({pressed}) => [
          {
            padding: 16,
            backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
            borderBottomWidth: 5,
            borderColor: COLORS.grayLight,
            gap: 16,
          },
        ]}
        onPress={handleReview}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, gap: 8}}>
            <Text
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: COLORS.opacityDark,
                alignSelf: 'flex-start',
                color: COLORS.black,
              }}>
              Chưa đánh giá
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              Grand Ha Noi
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Lorem ipsum dolor sit amet consectetur
              </Text>
              <Text style={{color: COLORS.opacityDark}}>
                11 thg 11, 2024 - 13 thg 11, 2024
              </Text>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
            }}
            style={{width: 70, height: 70, borderRadius: 10}}
          />
        </View>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            pressed && {
              opacity: 0.5,
            },
          ]}
          onPress={handleReview}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Viết đánh giá
          </Text>
          <Entypo name="dot-single" size={30} color={COLORS.red} />
        </Pressable>
      </Pressable>
      <Pressable
        style={({pressed}) => [
          {
            padding: 16,
            backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
            borderBottomWidth: 5,
            borderColor: COLORS.grayLight,
            gap: 16,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, gap: 8}}>
            <Text
              style={{
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: COLORS.opacityDark,
                alignSelf: 'flex-start',
              }}>
              Chưa đánh giá
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              Grand Ha Noi
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Lorem ipsum dolor sit amet consectetur
              </Text>
              <Text style={{color: COLORS.opacityDark}}>
                11 thg 11, 2024 - 13 thg 11, 2024
              </Text>
            </View>
          </View>
          <Image
            source={{
              uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
            }}
            style={{width: 70, height: 70, borderRadius: 10}}
          />
        </View>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            pressed && {
              opacity: 0.5,
            },
          ]}>
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Viết đánh giá
          </Text>
          <Entypo name="dot-single" size={30} color={COLORS.red} />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ReviewScreen;
