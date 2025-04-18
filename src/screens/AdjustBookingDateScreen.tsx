// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import React, {useCallback, useMemo, useRef, useState} from 'react';
// import IconComponent from '@components/IconComponent';
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetFlashList,
//   BottomSheetFlatList,
//   BottomSheetScrollView,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';
// import moment from 'moment';
// import {CalendarList} from 'react-native-calendars';
// import 'moment/locale/vi';
// moment.locale('vi'); // Đặt ngôn ngữ mặc định là tiếng Việt

// const AdjustBookingDateScreen = ({route}: {route: any}) => {
//   const {infoBooking} = route.params || {};
//   const [selected, setSelected] = useState('');
//   const bottomSheetRef = useRef<BottomSheet>(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);

//   const checkinDate = moment(infoBooking?.checkin_date).format('YYYY-MM-DD');
//   const checkoutDate = moment(infoBooking?.checkout_date).format('YYYY-MM-DD');

//   // Tính toán ngày hiện tại
//   const currentDate = moment().format('YYYY-MM-DD');
//   console.log('currentDate', currentDate);
//   console.log('startDate', startDate);
//   console.log('endDate', endDate);

//   // Highlight các ngày được chọn
//   const markedDates: any = {};

//   if (startDate) {
//     markedDates[startDate] = {
//       selected: true,
//       startingDay: true,
//       customStyles: {
//         container: {
//           backgroundColor: '#0165FC',
//           borderTopLeftRadius: 6, // Bo góc trái trên
//           borderBottomLeftRadius: 6, // Bo góc trái dưới
//           borderTopRightRadius: 0, // Không bo góc phải trên
//           borderBottomRightRadius: 0, // Không bo góc phải dưới
//           width: '100%',
//         },
//         text: {color: 'white'},
//       },
//     };
//   }

//   if (endDate) {
//     markedDates[endDate] = {
//       selected: true,
//       endingDay: true,
//       customStyles: {
//         container: {
//           backgroundColor: '#0165FC',
//           borderTopRightRadius: 6, // Bo góc phải trên
//           borderBottomRightRadius: 6, // Bo góc phải dưới
//           borderTopLeftRadius: 0, // Không bo góc trái trên
//           borderBottomLeftRadius: 0, // Không bo góc trái dưới
//           width: '100%',
//         },
//         text: {color: 'white'},
//       },
//     };
//   }

//   if (startDate && endDate) {
//     let currentDate = moment(startDate).add(1, 'day');
//     while (currentDate.isBefore(endDate)) {
//       markedDates[currentDate.format('YYYY-MM-DD')] = {
//         selected: true,
//         customStyles: {
//           container: {
//             backgroundColor: '#cccccc', // Màu nhạt hơn cho ngày ở giữa
//             borderRadius: 0, // Không bo góc để các ngày nối liền nhau
//             width: '100%',
//           },
//           text: {color: 'black'},
//         },
//       };
//       currentDate.add(1, 'day');
//     }
//   }

//   // Disable các ngày đã qua
//   const disableDates: any = {};
//   const today = moment(); // Ngày hiện tại (18/2)
//   for (
//     let date = moment().startOf('day');
//     date.isBefore(today);
//     date.add(1, 'day')
//   ) {
//     disableDates[date.format('YYYY-MM-DD')] = {
//       disabled: true, // Disable ngày đã qua
//       selectedColor: 'grey', // Màu mờ cho ngày đã qua
//     };
//   }

//   // Chiều cao của thiết bị
//   const height = Dimensions.get('window').height * 0.6;

//   // variables
//   const snapPoints = useMemo(() => ['60%'], []);
//   // callbacks
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   return (
//     <>
//       <View style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
//         <View style={{gap: 16}}>
//           <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold'}}>
//             Chọn ngày mới
//           </Text>
//           <Text
//             style={{
//               color: '#000',
//               fontSize: 13,
//             }}>
//             Kiểm tra tình trạng trống tại chỗ nghỉ này vào các ngày mới
//           </Text>
//           <View
//             style={{
//               padding: 16,
//               backgroundColor: '#fff',
//               gap: 16,
//               shadowColor: '#000',
//               shadowOffset: {width: 0, height: 2},
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 3,
//               borderRadius: 4,
//             }}>
//             <TouchableOpacity
//               style={{flexDirection: 'row', gap: 10}}
//               onPress={() => bottomSheetRef.current?.expand()}>
//               <IconComponent
//                 name="calendar-multiselect"
//                 library="MaterialCommunityIcons"
//                 size={24}
//                 color="#000"
//               />
//               <View style={{gap: 4}}>
//                 <Text style={{color: '#000', fontWeight: 'bold'}}>
//                   Nhận phòng
//                 </Text>
//                 <Text style={{color: '#0165FC', fontWeight: 'bold'}}>
//                   Thứ 3, 12 tháng 2, 2025
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <View style={{height: 1, backgroundColor: '#ccc'}}></View>
//             <TouchableOpacity style={{flexDirection: 'row', gap: 10}}>
//               <IconComponent
//                 name="calendar-outline"
//                 library="MaterialCommunityIcons"
//                 size={24}
//                 color="#000"
//               />
//               <View style={{gap: 4}}>
//                 <Text style={{color: '#000', fontWeight: 'bold'}}>
//                   Trả phòng
//                 </Text>
//                 <Text style={{color: '#0165FC', fontWeight: 'bold'}}>
//                   Thứ 3, 12 tháng 2, 2025
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <View
//         style={{
//           backgroundColor: '#fff',
//           padding: 16,
//           // Shadow properties
//           shadowColor: '#000', // Màu của shadow
//           shadowOffset: {width: 0, height: -15}, // Đổ bóng phía trên (height âm)
//           shadowOpacity: 0.2, // Độ trong suốt của shadow
//           shadowRadius: 3, // Độ mờ của shadow
//           elevation: 10, // Hỗ trợ shadow trên Android
//         }}>
//         <TouchableOpacity
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: 12,
//             backgroundColor: '#0165FC',
//             width: '100%',
//             gap: 10,
//             borderRadius: 3,
//           }}>
//           <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
//             Kiểm tra tình trạng phòng trống
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {/* Bottom sheet số phòng */}
//       <BottomSheet
//         ref={bottomSheetRef}
//         onChange={handleSheetChanges}
//         enableContentPanningGesture={false}
//         enablePanDownToClose={true}
//         enableOverDrag={false}
//         index={-1}
//         snapPoints={[height]}
//         handleIndicatorStyle={{
//           width: '13%',
//           backgroundColor: '#797979',
//         }}>
//         <View
//           style={{
//             paddingHorizontal: 32,
//             paddingVertical: 16,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             borderBottomWidth: 1,
//             borderColor: '#ccc',
//           }}>
//           <Text>Th2</Text>
//           <Text>Th3</Text>
//           <Text>Th4</Text>
//           <Text>Th5</Text>
//           <Text>Th6</Text>
//           <Text>Th7</Text>
//           <Text>CN</Text>
//         </View>

//         <BottomSheetView style={{flex: 1, gap: 16}}>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <CalendarList
//               pastScrollRange={0}
//               futureScrollRange={12}
//               showScrollIndicator={false}
//               horizontal={false}
//               calendarHeight={200}
//               hideDayNames
//               initialNumToRender={12}
//               markingType="custom"
//               windowSize={13}
//               removeClippedSubviews={false}
//               markedDates={markedDates} // Kết hợp các ngày đã chọn và ngày bị disable
//               onDayPress={day => {
//                 const selectedDate = day.dateString;

//                 if (!startDate || (startDate && endDate)) {
//                   // Nếu chưa có ngày bắt đầu hoặc đã chọn cả 2 ngày, reset lại từ đầu
//                   setStartDate(selectedDate);
//                   setEndDate(null);
//                 } else if (!endDate) {
//                   // Nếu đã có ngày bắt đầu nhưng chưa có ngày kết thúc
//                   if (moment(selectedDate).isAfter(startDate)) {
//                     setEndDate(selectedDate);
//                   } else {
//                     // Nếu chọn ngày kết thúc trước ngày bắt đầu, đặt lại ngày bắt đầu
//                     setStartDate(selectedDate);
//                   }
//                 }
//               }}
//             />
//           </View>
//           <View
//             style={{
//               backgroundColor: '#fff',
//               padding: 16,
//               // Shadow properties
//               shadowColor: '#000', // Màu của shadow
//               shadowOffset: {width: 0, height: -15}, // Đổ bóng phía trên (height âm)
//               shadowOpacity: 0.2, // Độ trong suốt của shadow
//               shadowRadius: 3, // Độ mờ của shadow
//               elevation: 10, // Hỗ trợ shadow trên Android
//             }}>
//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 padding: 12,
//                 backgroundColor: '#0165FC',
//                 width: '100%',
//                 gap: 10,
//                 borderRadius: 3,
//               }}>
//               <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
//                 Kiểm tra tình trạng phòng trống
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </BottomSheetView>
//       </BottomSheet>
//     </>
//   );
// };

// export default AdjustBookingDateScreen;

// const styles = StyleSheet.create({});

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
// import IconComponent from '@components/IconComponent';
// import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
// import moment from 'moment';
// import {CalendarList} from 'react-native-calendars';
// import 'moment/locale/vi';
// moment.locale('vi');

// const AdjustBookingDateScreen = ({route}: {route: any}) => {
//   const {infoBooking} = route.params || {};
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // Parse dates just once during component initialization
//   const initialCheckinDate = useMemo(
//     () => moment(infoBooking?.checkin_date).format('YYYY-MM-DD'),
//     [infoBooking?.checkin_date],
//   );

//   const initialCheckoutDate = useMemo(
//     () => moment(infoBooking?.checkout_date).format('YYYY-MM-DD'),
//     [infoBooking?.checkout_date],
//   );

//   // State management
//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null,
//   });

//   // Calculate formatted display dates only when they change
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

//     if (startDate) {
//       result[startDate] = {
//         selected: true,
//         startingDay: true,
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
//         selected: true,
//         endingDay: true,
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
//       let curDate = moment(startDate).clone();
//       while (curDate.add(1, 'day').isBefore(moment(endDate))) {
//         result[curDate.format('YYYY-MM-DD')] = {
//           selected: true,
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

//     // Disable past dates
//     const today = moment().startOf('day');
//     const pastDays = moment().diff(today.clone().subtract(7, 'days'), 'days');

//     for (let i = 0; i < pastDays; i++) {
//       const dateString = today.clone().subtract(i, 'days').format('YYYY-MM-DD');
//       result[dateString] = {
//         ...result[dateString],
//         disabled: true,
//         selectedColor: 'grey',
//       };
//     }

//     return result;
//   }, [dateRange.startDate, dateRange.endDate]);

//   // Memoize height calculation
//   const height = useMemo(() => Dimensions.get('window').height * 0.6, []);

//   // Memoize snap points
//   const snapPoints = useMemo(() => ['60%'], []);

//   // Handle day selection with useCallback
//   const handleDayPress = useCallback(day => {
//     const selectedDate = day.dateString;

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
//     // Removed console.log for performance
//   }, []);

//   // Handle check availability button press
//   const handleCheckAvailability = useCallback(() => {
//     // Implement your check availability logic here
//     bottomSheetRef.current?.close();
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
const AdjustBookingDateScreen = ({route}: {route: any}) => {
  const {infoBooking} = route.params || {};
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<any>();
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0} // Backdrop xuất hiện khi Bottom Sheet ở snap point đầu tiên
      disappearsOnIndex={-1} // Backdrop biến mất khi Bottom Sheet đóng
      opacity={0.7} // Độ trong suốt của backdrop (0 - trong suốt, 1 - hoàn toàn mờ)
      pressBehavior="none"
    />
  );

  // ngày checkin và checkout
  const initialCheckinDate = useMemo(
    () => moment(infoBooking?.checkin_date).format('YYYY-MM-DD'),
    [infoBooking?.checkin_date],
  );

  const initialCheckoutDate = useMemo(
    () => moment(infoBooking?.checkout_date).format('YYYY-MM-DD'),
    [infoBooking?.checkout_date],
  );

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

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

  // Memoize current date to avoid recalculation on every render
  const currentDate = useMemo(() => moment().format('YYYY-MM-DD'), []);

  // Calculate marked dates only when necessary
  const markedDates = useMemo(() => {
    const result: any = {};
    const {startDate, endDate} = dateRange;
    const today = moment().startOf('day');

    // First, disable all past dates (including today if needed)
    // Generate dates from 6 months ago until yesterday to ensure all past dates are disabled
    const startDisableDate = moment().subtract(6, 'months');
    const endDisableDate = moment().subtract(1, 'day');

    // Create a loop from 6 months ago till yesterday
    let currentDisableDate = startDisableDate.clone();
    while (currentDisableDate.isSameOrBefore(endDisableDate)) {
      const dateStr = currentDisableDate.format('YYYY-MM-DD');
      result[dateStr] = {
        disabled: true,
        disableTouchEvent: true, // Prevent touch events completely
        customStyles: {
          container: {
            backgroundColor: '#f0f0f0',
          },
          text: {
            color: '#c0c0c0',
            textDecorationLine: 'line-through',
          },
        },
      };
      currentDisableDate.add(1, 'day');
    }

    // Now handle selected date range
    if (startDate) {
      result[startDate] = {
        ...result[startDate],
        selected: true,
        startingDay: true,
        disabled: false, // Ensure the day is enabled if it was previously disabled
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

    if (endDate) {
      result[endDate] = {
        ...result[endDate],
        selected: true,
        endingDay: true,
        disabled: false, // Ensure the day is enabled if it was previously disabled
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

    if (startDate && endDate) {
      // Handle dates between start and end
      let curDate = moment(startDate).clone();

      while (curDate.add(1, 'day').isBefore(moment(endDate))) {
        const dateStr = curDate.format('YYYY-MM-DD');
        result[dateStr] = {
          ...result[dateStr],
          selected: true,
          disabled: false, // Ensure the day is enabled if it was previously disabled
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

  // Memoize height calculation
  const height = useMemo(() => Dimensions.get('window').height * 0.6, []);

  // Memoize snap points
  const snapPoints = useMemo(() => ['60%'], []);

  // Handle day selection with useCallback
  const handleDayPress = useCallback((day: any) => {
    const selectedDate = day.dateString;

    // Skip selection if date is in the past
    if (moment(selectedDate).isBefore(moment().startOf('day'))) {
      return;
    }

    setDateRange(prev => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        // Reset selection if no start date or both dates are selected
        return {
          startDate: selectedDate,
          endDate: null,
        };
      } else {
        // Set end date if we already have a start date
        if (moment(selectedDate).isAfter(prev.startDate)) {
          return {
            ...prev,
            endDate: selectedDate,
          };
        } else {
          // If selected date is before start date, make it the new start date
          return {
            startDate: selectedDate,
            endDate: null,
          };
        }
      }
    });
  }, []);

  // Handle bottom sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    // Empty implementation for performance
  }, []);

  // Handle check availability button press
  const handleCheckAvailability = useCallback(() => {
    // Implement your check availability logic here
    bottomSheetRef.current?.close();
    navigation.navigate('ChangeDateConfirm');
  }, []);

  // Handle open calendar
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
          style={styles.checkButton}
          onPress={handleCheckAvailability}>
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
              minDate={moment().format('YYYY-MM-DD')} // Set minimum date to today
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.checkButton}
              onPress={handleCheckAvailability}>
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

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
// } from 'react-native';
// import React, {useCallback, useMemo, useRef, useState} from 'react';
// import IconComponent from '@components/IconComponent';
// import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
// import moment from 'moment';
// import {CalendarList} from 'react-native-calendars';
// import 'moment/locale/vi';
// moment.locale('vi');

// const AdjustBookingDateScreen = ({route}: {route: any}) => {
//   const {infoBooking} = route.params || {};
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // Parse dates just once during component initialization
//   const initialCheckinDate = useMemo(
//     () => moment(infoBooking?.checkin_date).format('YYYY-MM-DD'),
//     [infoBooking?.checkin_date],
//   );

//   const initialCheckoutDate = useMemo(
//     () => moment(infoBooking?.checkout_date).format('YYYY-MM-DD'),
//     [infoBooking?.checkout_date],
//   );

//   // State management
//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null,
//   });

//   // Calculate formatted display dates only when they change
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

//     // Handle selected date range
//     if (startDate) {
//       result[startDate] = {
//         selected: true,
//         startingDay: true,
//         customStyles: {
//           container: {
//             backgroundColor: '#0165FC',
//             borderTopLeftRadius: 6,
//             borderBottomLeftRadius: 6,
//             borderTopRightRadius: endDate ? 0 : 6,
//             borderBottomRightRadius: endDate ? 0 : 6,
//             width: '100%',
//           },
//           text: {color: 'white'},
//         },
//       };
//     }

//     if (endDate) {
//       result[endDate] = {
//         selected: true,
//         endingDay: true,
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

//     // Handle dates between start and end date
//     if (startDate && endDate) {
//       let curDate = moment(startDate).clone();
//       while (curDate.add(1, 'day').isBefore(moment(endDate))) {
//         const dateStr = curDate.format('YYYY-MM-DD');
//         result[dateStr] = {
//           selected: true,
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
//   const handleDayPress = useCallback(day => {
//     const selectedDate = day.dateString;

//     // Prevent selecting past dates (this is needed as a fallback)
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
//               minDate={moment().format('YYYY-MM-DD')} // This is the key - simply set minDate to today
//               theme={{
//                 // Theme customization for disabled dates
//                 'stylesheet.day.basic': {
//                   base: {
//                     width: 32,
//                     height: 32,
//                     alignItems: 'center',
//                   },
//                   today: {
//                     backgroundColor: '#F0F8FF',
//                     borderRadius: 8,
//                   },
//                   disabled: {
//                     backgroundColor: '#f0f0f0',
//                   },
//                   disabledText: {
//                     color: '#c0c0c0',
//                     textDecorationLine: 'line-through',
//                   },
//                 },
//               }}
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
