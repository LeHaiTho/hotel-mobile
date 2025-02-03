import {View, Text} from 'react-native';
import React from 'react';

type RatingBarProps = {
  title: string;
  rating: number;
  maxRating: number;
  fillColor?: string;
  backgroundColor?: string;
};

const RatingBar = ({
  title,
  rating,
  maxRating,
  fillColor = '#003b95',
  backgroundColor = '#e0e0e0',
}: RatingBarProps) => {
  const rate = (rating / maxRating) * 10;
  const percentTage = (rating / maxRating) * 100;

  // Hàm xác định màu sắc của RatingBar
  const getFillColor = (percentTage: number): string => {
    if (percentTage >= 80) {
      return '#058633'; // Xanh đen
    } else if (percentTage >= 60 && percentTage < 80) {
      return '#003b95'; // Xanh tím
    } else {
      return '#D90F1D';
    }
  };
  return (
    <View
      style={{
        gap: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#000',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: '#000',
          }}>
          {rate}
        </Text>
      </View>
      <View
        style={{
          height: 8,
          backgroundColor,
          borderRadius: 5,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: `${percentTage}%`,
            height: '100%',
            backgroundColor: getFillColor(percentTage),
            borderRadius: 5,
          }}></View>
      </View>
    </View>
  );
};

export default RatingBar;
