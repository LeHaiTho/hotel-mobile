import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '@styles/colors';
import Header from '@components/review/Header';
import RatingSelector from '@components/review/RatingSelector';
import {
  OVERALL_SCORES,
  STAFF_SCORES,
  FACILITY_SCORES,
  CLEAN_SCORES,
  MONEY_SCORES,
  COMFORTABLE_SCORES,
  LOCATION_SCORES,
} from '@utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Step1ReviewScreen = () => {
  const [ratings, setRatings] = useState({
    overall: 0,
    staff: 0,
    facility: 0,
    comfortable: 0,
    money: 0,
    clean: 0,
    location: 0,
    comment: '',
  });
  const navigation = useNavigation();

  // Fake hotel info
  const hotelInfo = {
    imageUrl:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/398525515.jpg?k=bd416f1b0cd0e1276f7d6f0497a16790d2999d28d5ce37259ae95ef6333b2652&o=&hp=1',
    name: 'Hotel Nha Trang',
    roomType: 'Phòng Deluxe',
    stayDetails: '2 ngày 1 đêm',
    date: '2024-01-01',
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: `Bước ${step} trên 2`,
  //     headerTitleAlign: 'left',
  //     headerStyle: {
  //       backgroundColor: COLORS.primaryDark,
  //     },
  //     headerLeft: () => (
  //       <Pressable
  //         style={({pressed}) => [
  //           {
  //             padding: 8,
  //             borderRadius: 50,
  //             backgroundColor: pressed ? COLORS.opacity : 'transparent',
  //             marginLeft: -10,
  //             marginRight: 26,
  //           },
  //         ]}
  //         onPress={() => {
  //           if (step === 2) {
  //             setStep(1);
  //           } else {
  //             navigation.goBack();
  //           }
  //         }}>
  //         <Ionicons name="arrow-back" size={22} color="#fff" />
  //       </Pressable>
  //     ),
  //   });
  // }, [step, navigation]);

  // const handleBackPress = () => {
  //   if (step === 2) {
  //     setStep(1);
  //   } else {
  //     navigation.goBack();
  //   }
  // };

  const handleNext = useCallback(() => {
    console.log('submit review', ratings);
  }, [ratings]);

  const canProceed = useMemo(() => {
    return (
      ratings.overall > 0 &&
      ratings.staff > 0 &&
      ratings.facility > 0 &&
      ratings.comfortable > 0 &&
      ratings.clean > 0 &&
      ratings.money > 0 &&
      ratings.location > 0 &&
      ratings.comment.length > 0
    );
  }, [ratings]);

  // Rating update handler
  const updateRating = useCallback(
    ({type, value}: {type: string; value: number | string}) => {
      setRatings(prev => ({...prev, [type]: value}));
    },
    [],
  );

  const handleOverallRating = useCallback(
    (score: number) => updateRating({type: 'overall', value: score}),
    [updateRating],
  );

  const handleStaffRating = useCallback(
    (score: number) => updateRating({type: 'staff', value: score}),
    [updateRating],
  );

  const handleFacilityRating = useCallback(
    (score: number) => updateRating({type: 'facility', value: score}),
    [updateRating],
  );

  const handleComfortableRating = useCallback(
    (score: number) => updateRating({type: 'comfortable', value: score}),
    [updateRating],
  );

  const handleCleanRating = useCallback(
    (score: number) => updateRating({type: 'clean', value: score}),
    [updateRating],
  );

  const handleMoneyRating = useCallback(
    (score: number) => updateRating({type: 'money', value: score}),
    [updateRating],
  );

  const handleLocationRating = useCallback(
    (score: number) => updateRating({type: 'location', value: score}),
    [updateRating],
  );

  const handleCommentChange = useCallback(
    (text: string) => updateRating({type: 'comment', value: text}),
    [updateRating],
  );
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.white,
          gap: 10,
        }}>
        <Header hotelInfo={hotelInfo} />
        <View
          style={{
            flex: 1,
            gap: 10,
            padding: 16,
          }}>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá chung</Text>
            {ratings?.overall > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={
                    OVERALL_SCORES.find(score => score.id === ratings.overall)
                      ?.icon || 'sentiment-very-dissatisfied'
                  }
                  size={24}
                  color={COLORS.black}
                />
                <Text>
                  {OVERALL_SCORES.find(score => score.id === ratings.overall)
                    ?.name || 'Không hài lòng'}
                </Text>
              </View>
            )}
            <RatingSelector
              items={OVERALL_SCORES}
              selectedScore={ratings.overall}
              onSelect={handleOverallRating}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Tệ
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Rất tốt
              </Text>
            </View>
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá nhân viên</Text>
            <RatingSelector
              items={STAFF_SCORES}
              selectedScore={ratings.staff}
              onSelect={handleStaffRating}
              showIcon
            />
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá phòng</Text>
            <RatingSelector
              items={FACILITY_SCORES}
              selectedScore={ratings.facility}
              onSelect={handleFacilityRating}
              showIcon
            />
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá tiện nghi</Text>
            <RatingSelector
              items={COMFORTABLE_SCORES}
              selectedScore={ratings.comfortable}
              onSelect={handleComfortableRating}
              showIcon
            />
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá sạch sẽ</Text>
            <RatingSelector
              items={CLEAN_SCORES}
              selectedScore={ratings.clean}
              onSelect={handleCleanRating}
              showIcon
            />
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá giá cả</Text>
            <RatingSelector
              items={MONEY_SCORES}
              selectedScore={ratings.money}
              onSelect={handleMoneyRating}
              showIcon
            />
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Đánh giá vị trí</Text>
            <RatingSelector
              items={LOCATION_SCORES}
              selectedScore={ratings.location}
              onSelect={handleLocationRating}
              showIcon
            />
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.ratingLabel}>Nhận xét</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: COLORS.grayLight,
                borderRadius: 10,
                padding: 10,
                textAlignVertical: 'top',
              }}
              numberOfLines={3}
              placeholder="Nhận xét"
              value={ratings.comment}
              onChangeText={handleCommentChange}
            />
          </View>

          <Pressable
            style={({pressed}) => [
              styles.button,
              {
                backgroundColor: pressed
                  ? COLORS.primaryLight
                  : canProceed
                  ? COLORS.primary
                  : COLORS.gray,
              },
            ]}
            onPress={handleNext}
            disabled={!canProceed}>
            <Text style={styles.buttonText}>Hoàn thành</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    height: '30%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  overlayTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  overlaySubtitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlayText: {
    color: COLORS.white,
    fontSize: 16,
  },
  ratingSection: {
    padding: 16,
    gap: 5,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  ratingQuestion: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    borderWidth: 0.6,
    borderColor: COLORS.grayLight,
    borderRadius: 100,
    overflow: 'hidden',
  },
  ratingButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.6,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Step1ReviewScreen;
