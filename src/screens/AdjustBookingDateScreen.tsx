// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import React, {useCallback, useMemo, useRef, useState} from 'react';
// import IconComponent from '@components/IconComponent';
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';
// import moment from 'moment';
// import {CalendarList} from 'react-native-calendars';
// import 'moment/locale/vi';
// moment.locale('vi');
// import {useNavigation} from '@react-navigation/native';
// const AdjustBookingDateScreen = ({route}: {route: any}) => {
//   const {infoBooking} = route.params || {};
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const navigation = useNavigation<any>();
//   const renderBackdrop = (props: any) => (
//     <BottomSheetBackdrop
//       {...props}
//       appearsOnIndex={0} // Backdrop xuất hiện khi Bottom Sheet ở snap point đầu tiên
//       disappearsOnIndex={-1} // Backdrop biến mất khi Bottom Sheet đóng
//       opacity={0.7} // Độ trong suốt của backdrop (0 - trong suốt, 1 - hoàn toàn mờ)
//       pressBehavior="none"
//     />
//   );

//   // ngày checkin và checkout
//   const initialCheckinDate = useMemo(
//     () => moment(infoBooking?.checkin_date).format('YYYY-MM-DD'),
//     [infoBooking?.checkin_date],
//   );

//   const initialCheckoutDate = useMemo(
//     () => moment(infoBooking?.checkout_date).format('YYYY-MM-DD'),
//     [infoBooking?.checkout_date],
//   );

//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null,
//   });

//   const displayDates = useMemo(() => {
//     const startFormatted = dateRange.startDate
//       ? moment(dateRange.startDate).format('dddd, D [tháng] M, YYYY')
//       : initialCheckinDate
//       ? moment(initialCheckinDate).format('dddd, D [tháng] M, YYYY')
//       : '';

//     const endFormatted = dateRange.endDate
//       ? moment(dateRange.endDate).format('dddd, D [tháng] M, YYYY')
//       : initialCheckoutDate
//       ? moment(initialCheckoutDate).format('dddd, D [tháng] M, YYYY')
//       : '';

//     return {
//       startFormatted:
//         startFormatted.charAt(0).toUpperCase() + startFormatted.slice(1),
//       endFormatted:
//         endFormatted.charAt(0).toUpperCase() + endFormatted.slice(1),
//     };
//   }, [
//     dateRange.startDate,
//     dateRange.endDate,
//     initialCheckinDate,
//     initialCheckoutDate,
//   ]);

//   // Memoize current date to avoid recalculation on every render
//   const currentDate = useMemo(() => moment().format('YYYY-MM-DD'), []);

//   // Calculate marked dates only when necessary
//   const markedDates = useMemo(() => {
//     const result: any = {};
//     const {startDate, endDate} = dateRange;
//     const today = moment().startOf('day');

//     // First, disable all past dates (including today if needed)
//     // Generate dates from 6 months ago until yesterday to ensure all past dates are disabled
//     const startDisableDate = moment().subtract(6, 'months');
//     const endDisableDate = moment().subtract(1, 'day');

//     // Create a loop from 6 months ago till yesterday
//     let currentDisableDate = startDisableDate.clone();
//     while (currentDisableDate.isSameOrBefore(endDisableDate)) {
//       const dateStr = currentDisableDate.format('YYYY-MM-DD');
//       result[dateStr] = {
//         disabled: true,
//         disableTouchEvent: true, // Prevent touch events completely
//         customStyles: {
//           container: {
//             backgroundColor: '#f0f0f0',
//           },
//           text: {
//             color: '#c0c0c0',
//             textDecorationLine: 'line-through',
//           },
//         },
//       };
//       currentDisableDate.add(1, 'day');
//     }

//     // Now handle selected date range
//     if (startDate) {
//       result[startDate] = {
//         ...result[startDate],
//         selected: true,
//         startingDay: true,
//         disabled: false, // Ensure the day is enabled if it was previously disabled
//         disableTouchEvent: false,
//         customStyles: {
//           container: {
//             backgroundColor: '#0165FC',
//             borderTopLeftRadius: 6,
//             borderBottomLeftRadius: 6,
//             borderTopRightRadius: 0,
//             borderBottomRightRadius: 0,
//             width: '100%',
//           },
//           text: {color: 'white'},
//         },
//       };
//     }

//     if (endDate) {
//       result[endDate] = {
//         ...result[endDate],
//         selected: true,
//         endingDay: true,
//         disabled: false, // Ensure the day is enabled if it was previously disabled
//         disableTouchEvent: false,
//         customStyles: {
//           container: {
//             backgroundColor: '#0165FC',
//             borderTopRightRadius: 6,
//             borderBottomRightRadius: 6,
//             borderTopLeftRadius: 0,
//             borderBottomLeftRadius: 0,
//             width: '100%',
//           },
//           text: {color: 'white'},
//         },
//       };
//     }

//     if (startDate && endDate) {
//       // Handle dates between start and end
//       let curDate = moment(startDate).clone();

//       while (curDate.add(1, 'day').isBefore(moment(endDate))) {
//         const dateStr = curDate.format('YYYY-MM-DD');
//         result[dateStr] = {
//           ...result[dateStr],
//           selected: true,
//           disabled: false, // Ensure the day is enabled if it was previously disabled
//           disableTouchEvent: false,
//           customStyles: {
//             container: {
//               backgroundColor: '#cccccc',
//               borderRadius: 0,
//               width: '100%',
//             },
//             text: {color: 'black'},
//           },
//         };
//       }
//     }

//     return result;
//   }, [dateRange.startDate, dateRange.endDate]);

//   // Memoize height calculation
//   const height = useMemo(() => Dimensions.get('window').height * 0.6, []);

//   // Memoize snap points
//   const snapPoints = useMemo(() => ['60%'], []);

//   // Handle day selection with useCallback
//   const handleDayPress = useCallback((day: any) => {
//     const selectedDate = day.dateString;

//     // Skip selection if date is in the past
//     if (moment(selectedDate).isBefore(moment().startOf('day'))) {
//       return;
//     }

//     setDateRange(prev => {
//       if (!prev.startDate || (prev.startDate && prev.endDate)) {
//         // Reset selection if no start date or both dates are selected
//         return {
//           startDate: selectedDate,
//           endDate: null,
//         };
//       } else {
//         // Set end date if we already have a start date
//         if (moment(selectedDate).isAfter(prev.startDate)) {
//           return {
//             ...prev,
//             endDate: selectedDate,
//           };
//         } else {
//           // If selected date is before start date, make it the new start date
//           return {
//             startDate: selectedDate,
//             endDate: null,
//           };
//         }
//       }
//     });
//   }, []);

//   // Handle bottom sheet changes
//   const handleSheetChanges = useCallback((index: number) => {
//     // Empty implementation for performance
//   }, []);

//   // Handle check availability button press
//   const handleCheckAvailability = useCallback(() => {
//     // Implement your check availability logic here
//     bottomSheetRef.current?.close();
//     navigation.navigate('ChangeDateConfirm');
//   }, []);

//   // Handle open calendar
//   const handleOpenCalendar = useCallback(() => {
//     bottomSheetRef.current?.expand();
//   }, []);

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerTitle}>Chọn ngày mới</Text>
//           <Text style={styles.headerSubtitle}>
//             Kiểm tra tình trạng trống tại chỗ nghỉ này vào các ngày mới
//           </Text>
//           <View style={styles.dateSelectionContainer}>
//             <TouchableOpacity
//               style={styles.dateRow}
//               onPress={handleOpenCalendar}>
//               <IconComponent
//                 name="calendar-multiselect"
//                 library="MaterialCommunityIcons"
//                 size={24}
//                 color="#000"
//               />
//               <View style={styles.dateTextContainer}>
//                 <Text style={styles.dateLabel}>Nhận phòng</Text>
//                 <Text style={styles.dateValue}>
//                   {displayDates.startFormatted}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <View style={styles.divider}></View>
//             <TouchableOpacity
//               style={styles.dateRow}
//               onPress={handleOpenCalendar}>
//               <IconComponent
//                 name="calendar-outline"
//                 library="MaterialCommunityIcons"
//                 size={24}
//                 color="#000"
//               />
//               <View style={styles.dateTextContainer}>
//                 <Text style={styles.dateLabel}>Trả phòng</Text>
//                 <Text style={styles.dateValue}>
//                   {displayDates.endFormatted}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <View style={styles.bottomButtonContainer}>
//         <TouchableOpacity
//           style={styles.checkButton}
//           onPress={handleCheckAvailability}>
//           <Text style={styles.checkButtonText}>
//             Kiểm tra tình trạng phòng trống
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom sheet calendar */}
//       <BottomSheet
//         ref={bottomSheetRef}
//         onChange={handleSheetChanges}
//         enableContentPanningGesture={false}
//         enablePanDownToClose={true}
//         enableOverDrag={false}
//         backdropComponent={renderBackdrop}
//         index={-1}
//         snapPoints={snapPoints}
//         handleIndicatorStyle={styles.bottomSheetIndicator}>
//         <View style={styles.weekdayHeader}>
//           <Text>Th2</Text>
//           <Text>Th3</Text>
//           <Text>Th4</Text>
//           <Text>Th5</Text>
//           <Text>Th6</Text>
//           <Text>Th7</Text>
//           <Text>CN</Text>
//         </View>

//         <BottomSheetView style={styles.calendarContainer}>
//           <View style={styles.calendarWrapper}>
//             <CalendarList
//               pastScrollRange={0}
//               futureScrollRange={12}
//               showScrollIndicator={false}
//               horizontal={false}
//               calendarHeight={200}
//               hideDayNames
//               initialNumToRender={3}
//               markingType="custom"
//               windowSize={5}
//               removeClippedSubviews={false}
//               markedDates={markedDates}
//               onDayPress={handleDayPress}
//               minDate={moment().format('YYYY-MM-DD')} // Set minimum date to today
//             />
//           </View>
//           <View style={styles.bottomButtonContainer}>
//             <TouchableOpacity
//               style={styles.checkButton}
//               onPress={handleCheckAvailability}>
//               <Text style={styles.checkButtonText}>
//                 Kiểm tra tình trạng phòng trống
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </BottomSheetView>
//       </BottomSheet>
//     </>
//   );
// };

// export default React.memo(AdjustBookingDateScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   headerContainer: {
//     gap: 16,
//   },
//   headerTitle: {
//     color: '#000',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   headerSubtitle: {
//     color: '#000',
//     fontSize: 13,
//   },
//   dateSelectionContainer: {
//     padding: 16,
//     backgroundColor: '#fff',
//     gap: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 3,
//     borderRadius: 4,
//   },
//   dateRow: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   dateTextContainer: {
//     gap: 4,
//   },
//   dateLabel: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   dateValue: {
//     color: '#0165FC',
//     fontWeight: 'bold',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   bottomButtonContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -15},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 10,
//   },
//   checkButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 12,
//     backgroundColor: '#0165FC',
//     width: '100%',
//     gap: 10,
//     borderRadius: 3,
//   },
//   checkButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   bottomSheetIndicator: {
//     width: '13%',
//     backgroundColor: '#797979',
//   },
//   weekdayHeader: {
//     paddingHorizontal: 32,
//     paddingVertical: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   calendarContainer: {
//     flex: 1,
//     gap: 16,
//   },
//   calendarWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import IconComponent from '@components/IconComponent';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import moment from 'moment';
import {CalendarList} from 'react-native-calendars';
import 'moment/locale/vi';
moment.locale('vi');
import {useNavigation} from '@react-navigation/native';
import axios from 'axios'; // Thêm axios để gọi API
import {API_URL} from '@utils/constants';
import useAuthStore from '@stores/authStore';

const AdjustBookingDateScreen = ({route}: {route: any}) => {
  const {infoBooking} = route.params || {};
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<any>();

  // Render backdrop cho BottomSheet
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.7}
      pressBehavior="none"
    />
  );

  // Ngày check-in và check-out ban đầu từ booking
  const initialCheckinDate = useMemo(
    () => moment(infoBooking?.checkin_date).format('YYYY-MM-DD'),
    [infoBooking?.checkin_date],
  );

  const initialCheckoutDate = useMemo(
    () => moment(infoBooking?.checkout_date).format('YYYY-MM-DD'),
    [infoBooking?.checkout_date],
  );

  // State cho khoảng ngày được chọn
  const [dateRange, setDateRange] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });

  // Kiểm tra xem ngày có thay đổi hay không
  const isDateUnchanged = useMemo(() => {
    const selectedStartDate = dateRange.startDate || initialCheckinDate;
    const selectedEndDate = dateRange.endDate || initialCheckoutDate;
    return (
      selectedStartDate === initialCheckinDate &&
      selectedEndDate === initialCheckoutDate
    );
  }, [
    dateRange.startDate,
    dateRange.endDate,
    initialCheckinDate,
    initialCheckoutDate,
  ]);

  // Format ngày hiển thị
  const displayDates = useMemo(() => {
    const startFormatted = dateRange.startDate
      ? moment(dateRange.startDate).format('dddd, D [tháng] M, YYYY')
      : initialCheckinDate
      ? moment(initialCheckinDate).format('dddd, D [tháng] M, YYYY')
      : '';

    const endFormatted = dateRange.endDate
      ? moment(dateRange.endDate).format('dddd, D [tháng] M, YYYY')
      : initialCheckoutDate
      ? moment(initialCheckoutDate).format('dddd, D [tháng] M, YYYY')
      : '';

    return {
      startFormatted:
        startFormatted.charAt(0).toUpperCase() + startFormatted.slice(1),
      endFormatted:
        endFormatted.charAt(0).toUpperCase() + endFormatted.slice(1),
    };
  }, [
    dateRange.startDate,
    dateRange.endDate,
    initialCheckinDate,
    initialCheckoutDate,
  ]);

  // Ngày hiện tại
  const currentDate = useMemo(() => moment().format('YYYY-MM-DD'), []);

  // Marked dates cho lịch
  const markedDates = useMemo(() => {
    const result: any = {};
    const {startDate, endDate} = dateRange;

    // Vô hiệu hóa các ngày trong quá khứ
    const startDisableDate = moment().subtract(6, 'months');
    const endDisableDate = moment().subtract(1, 'day');
    let currentDisableDate = startDisableDate.clone();
    while (currentDisableDate.isSameOrBefore(endDisableDate)) {
      const dateStr = currentDisableDate.format('YYYY-MM-DD');
      result[dateStr] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {backgroundColor: '#f0f0f0'},
          text: {color: '#c0c0c0', textDecorationLine: 'line-through'},
        },
      };
      currentDisableDate.add(1, 'day');
    }

    // Đánh dấu ngày bắt đầu
    if (startDate) {
      result[startDate] = {
        ...result[startDate],
        selected: true,
        startingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: '#0165FC',
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            width: '100%',
          },
          text: {color: 'white'},
        },
      };
    }

    // Đánh dấu ngày kết thúc
    if (endDate) {
      result[endDate] = {
        ...result[endDate],
        selected: true,
        endingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: '#0165FC',
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%',
          },
          text: {color: 'white'},
        },
      };
    }

    // Đánh dấu các ngày giữa
    if (startDate && endDate) {
      let curDate = moment(startDate).clone();
      while (curDate.add(1, 'day').isBefore(moment(endDate))) {
        const dateStr = curDate.format('YYYY-MM-DD');
        result[dateStr] = {
          ...result[dateStr],
          selected: true,
          disabled: false,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: '#cccccc',
              borderRadius: 0,
              width: '100%',
            },
            text: {color: 'black'},
          },
        };
      }
    }

    return result;
  }, [dateRange.startDate, dateRange.endDate]);

  // Chiều cao BottomSheet
  const height = useMemo(() => Dimensions.get('window').height * 0.6, []);
  const snapPoints = useMemo(() => ['60%'], []);

  // Xử lý chọn ngày
  const handleDayPress = useCallback((day: any) => {
    const selectedDate = day.dateString;
    if (moment(selectedDate).isBefore(moment().startOf('day'))) {
      return;
    }

    setDateRange(prev => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        return {startDate: selectedDate, endDate: null};
      } else {
        if (moment(selectedDate).isAfter(prev.startDate)) {
          return {...prev, endDate: selectedDate};
        } else {
          return {startDate: selectedDate, endDate: null};
        }
      }
    });
  }, []);

  // Xử lý thay đổi BottomSheet
  const handleSheetChanges = useCallback((index: number) => {}, []);

  // Xử lý kiểm tra tình trạng phòng trống
  const handleCheckAvailability = useCallback(async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      Alert.alert('Lỗi', 'Vui lòng chọn đầy đủ ngày nhận phòng và trả phòng');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/hotel-properties/room/check-room-availability`,
        {
          bookingId: infoBooking.id,
          newCheckInDate: moment(dateRange.startDate).toISOString(),
          newCheckOutDate: moment(dateRange.endDate).toISOString(),
        },
      );

      if (response.data.available) {
        bottomSheetRef.current?.close();
        navigation.navigate('ChangeDateConfirm', {
          infoBooking,
          newCheckInDate: dateRange.startDate,
          newCheckOutDate: dateRange.endDate,
          // availableRooms: response.data.data,
        });
      } else {
        Alert.alert(
          'Không khả dụng',
          response.data.message || 'Không đủ phòng trống cho ngày đã chọn',
        );
      }
    } catch (error: any) {
      console.error('Error checking availability:', error);
      Alert.alert(
        'Lỗi',
        error.response?.data?.message ||
          'Đã có lỗi xảy ra khi kiểm tra phòng trống',
      );
    }
  }, [dateRange.startDate, dateRange.endDate, infoBooking, navigation]);

  // Xử lý mở lịch
  const handleOpenCalendar = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Chọn ngày mới</Text>
          <Text style={styles.headerSubtitle}>
            Kiểm tra tình trạng trống tại chỗ nghỉ này vào các ngày mới
          </Text>
          <View style={styles.dateSelectionContainer}>
            <TouchableOpacity
              style={styles.dateRow}
              onPress={handleOpenCalendar}>
              <IconComponent
                name="calendar-multiselect"
                library="MaterialCommunityIcons"
                size={24}
                color="#000"
              />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Nhận phòng</Text>
                <Text style={styles.dateValue}>
                  {displayDates.startFormatted}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={styles.dateRow}
              onPress={handleOpenCalendar}>
              <IconComponent
                name="calendar-outline"
                library="MaterialCommunityIcons"
                size={24}
                color="#000"
              />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Trả phòng</Text>
                <Text style={styles.dateValue}>
                  {displayDates.endFormatted}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.checkButton,
            isDateUnchanged && styles.checkButtonDisabled,
          ]}
          onPress={isDateUnchanged ? undefined : handleCheckAvailability}
          disabled={isDateUnchanged}>
          <Text style={styles.checkButtonText}>
            Kiểm tra tình trạng phòng trống
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom sheet calendar */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backdropComponent={renderBackdrop}
        index={-1}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.bottomSheetIndicator}>
        <View style={styles.weekdayHeader}>
          <Text>Th2</Text>
          <Text>Th3</Text>
          <Text>Th4</Text>
          <Text>Th5</Text>
          <Text>Th6</Text>
          <Text>Th7</Text>
          <Text>CN</Text>
        </View>

        <BottomSheetView style={styles.calendarContainer}>
          <View style={styles.calendarWrapper}>
            <CalendarList
              pastScrollRange={0}
              futureScrollRange={12}
              showScrollIndicator={false}
              horizontal={false}
              calendarHeight={200}
              hideDayNames
              initialNumToRender={3}
              markingType="custom"
              windowSize={5}
              removeClippedSubviews={false}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={moment().format('YYYY-MM-DD')}
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={[
                styles.checkButton,
                isDateUnchanged && styles.checkButtonDisabled,
              ]}
              onPress={isDateUnchanged ? undefined : handleCheckAvailability}
              disabled={isDateUnchanged}>
              <Text style={styles.checkButtonText}>
                Kiểm tra tình trạng phòng trống
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default React.memo(AdjustBookingDateScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    gap: 16,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#000',
    fontSize: 13,
  },
  dateSelectionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius: 4,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateTextContainer: {
    gap: 4,
  },
  dateLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  dateValue: {
    color: '#0165FC',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
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
  checkButtonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSheetIndicator: {
    width: '13%',
    backgroundColor: '#797979',
  },
  weekdayHeader: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  calendarContainer: {
    flex: 1,
    gap: 16,
  },
  calendarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
