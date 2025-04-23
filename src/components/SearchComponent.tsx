import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalComponent from './ModalComponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatDate} from '@utils/constants';
import axios from 'axios';
import {API_URL} from '../utils/constants';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {CalendarList} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');

const COLORS = {
  primary: '#FFB700',
  secondary: '#0165FF',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
};

type location = {
  address?: string;
  latitude?: string;
  longitude?: string;
};

type SearchComponentProps = {
  location?: location;
};

type initialSearchCondition = {
  checkInDate?: string;
  checkOutDate?: string;
  location?: location;
  capacity?: {
    adults?: number;
    children?: number;
  };
  rooms: number;
};

// Format ngày hiện tại theo chuẩn YYYY-MM-DD
const getCurrentDateFormatted = (): string => {
  return new Date().toLocaleDateString('en-CA').split('/').join('-');
};

// Lấy ngày mặc định cho checkout (ngày sau checkIn)
const getDefaultCheckOutDate = (checkInDateStr: string): string => {
  const checkIn = new Date(checkInDateStr);
  checkIn.setDate(checkIn.getDate() + 1);
  return checkIn.toLocaleDateString('en-CA').split('/').join('-');
};

const SearchComponent = React.memo(({location}: SearchComponentProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const initialDate = getCurrentDateFormatted();

  // State để lưu trữ searchCondition
  const [searchCondition, setSearchCondition] =
    useState<initialSearchCondition>({
      checkInDate: initialDate,
      checkOutDate: getDefaultCheckOutDate(initialDate),
      location: location,
      capacity: {
        adults: 2,
        children: 0,
      },
      rooms: 1,
    });

  // State để lưu trữ dateRange
  const [dateRange, setDateRange] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: initialDate,
    endDate: getDefaultCheckOutDate(initialDate),
  });

  // Snap points cho BottomSheetModal
  const snapPoints = useMemo(() => ['60%'], []);

  // Mở và đóng modal
  const openModal = useCallback((message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Mở BottomSheetModal
  const openCalendar = useCallback(() => {
    console.log('Opening calendar BottomSheetModal');
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    } else {
      console.error('bottomSheetRef is not initialized');
    }
  }, []);

  // Đóng BottomSheetModal
  const closeCalendar = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  // Render backdrop cho BottomSheetModal
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior="close"
      />
    ),
    [],
  );

  // Xử lý chọn ngày giống AdjustBookingDateScreen
  const handleDayPress = useCallback((day: any) => {
    const selectedDate = day.dateString;

    // Kiểm tra ngày trong quá khứ
    if (moment(selectedDate).isBefore(moment().startOf('day'))) {
      return;
    }

    setDateRange(prev => {
      if (!prev.startDate || (prev.startDate && prev.endDate)) {
        // Chọn ngày bắt đầu mới
        const newDateRange = {startDate: selectedDate, endDate: null};
        // Cập nhật searchCondition ngay lập tức
        setSearchCondition(prevCondition => ({
          ...prevCondition,
          checkInDate: selectedDate,
          checkOutDate: undefined, // Xóa checkOutDate vì chưa chọn
        }));
        return newDateRange;
      } else {
        // Đã có startDate, đang chọn endDate
        if (moment(selectedDate).isAfter(prev.startDate)) {
          const newDateRange = {...prev, endDate: selectedDate};
          // Cập nhật searchCondition ngay lập tức
          setSearchCondition(prevCondition => ({
            ...prevCondition,
            checkOutDate: selectedDate,
          }));
          return newDateRange;
        } else {
          // Nếu chọn ngày trước startDate, đặt lại startDate
          const newDateRange = {startDate: selectedDate, endDate: null};
          // Cập nhật searchCondition ngay lập tức
          setSearchCondition(prevCondition => ({
            ...prevCondition,
            checkInDate: selectedDate,
            checkOutDate: undefined,
          }));
          return newDateRange;
        }
      }
    });
  }, []);

  // Xác nhận ngày (chỉ đóng modal)
  const handleConfirmDate = useCallback(() => {
    if (dateRange.startDate && !dateRange.endDate) {
      openModal('Vui lòng chọn ngày trả phòng');
    } else {
      closeCalendar();
    }
  }, [dateRange, closeCalendar, openModal]);

  // Tối ưu markedDates với useMemo
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
            backgroundColor: COLORS.secondary,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: endDate === startDate ? 6 : 0,
            borderBottomRightRadius: endDate === startDate ? 6 : 0,
            width: '100%',
          },
          text: {color: COLORS.white},
        },
      };
    }

    // Đánh dấu ngày kết thúc
    if (endDate && endDate !== startDate) {
      result[endDate] = {
        ...result[endDate],
        selected: true,
        endingDay: true,
        disabled: false,
        disableTouchEvent: false,
        customStyles: {
          container: {
            backgroundColor: COLORS.secondary,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: '100%',
          },
          text: {color: COLORS.white},
        },
      };
    }

    // Đánh dấu các ngày giữa
    if (startDate && endDate && startDate !== endDate) {
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
            text: {color: COLORS.black},
          },
        };
      }
    }

    return result;
  }, [dateRange.startDate, dateRange.endDate]);

  // Điều hướng tới màn hình chọn địa điểm
  const handleLocation = useCallback(() => {
    navigation.replace('SearchLocation', {
      location,
    });
  }, [navigation, location]);

  // Xử lý tìm kiếm khách sạn
  const handleSearch = useCallback(async () => {
    try {
      if (searchCondition?.location?.address) {
        if (!searchCondition.checkOutDate) {
          openModal('Vui lòng chọn ngày trả phòng');
          return;
        }
        navigation.navigate('HotelSearchResults', {
          searchCondition,
        });
      } else {
        openModal('Vui lòng nhập điểm đến của bạn');
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [navigation, openModal, searchCondition]);

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        {/* Địa điểm */}
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedInput,
          ]}
          onPress={handleLocation}
          android_ripple={{color: '#e0e0e0'}}>
          <AntDesign name="search1" size={24} color={COLORS.black} />
          {searchCondition?.location?.address ? (
            <Text
              style={styles.inputText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {searchCondition.location.address}
            </Text>
          ) : (
            <Text style={styles.inputTextPlaceholder}>
              Nhập điểm đến của bạn
            </Text>
          )}
        </Pressable>

        {/* Ngày nhận phòng và trả phòng */}
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedInput,
          ]}
          onPress={openCalendar}
          android_ripple={{color: '#e0e0e0'}}>
          <AntDesign name="calendar" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            {searchCondition?.checkInDate && searchCondition?.checkOutDate ? (
              formatDate(searchCondition.checkInDate, true) +
              ' - ' +
              formatDate(searchCondition.checkOutDate, true)
            ) : (
              <Text style={styles.inputTextPlaceholder}>
                Chọn ngày nhận và trả phòng
              </Text>
            )}
          </Text>
        </Pressable>

        {/* Số lượng khách */}
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedInput,
          ]}
          android_ripple={{color: '#e0e0e0'}}>
          <AntDesign name="user" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            1 phòng - <Text>{searchCondition.capacity?.adults} người lớn</Text>{' '}
            - <Text>{searchCondition.capacity?.children} trẻ em</Text>
          </Text>
        </Pressable>

        {/* Nút tìm kiếm */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          activeOpacity={0.7}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      <ModalComponent modalVisible={modalVisible} closeModal={closeModal}>
        <Text style={styles.modalText}>{modalMessage}</Text>
        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </ModalComponent>

      {/* BottomSheetModal lịch */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        android_keyboardInputMode="adjustResize">
        <BottomSheetView style={styles.calendarContainer}>
          <View style={styles.weekdayHeader}>
            <Text>Th2</Text>
            <Text>Th3</Text>
            <Text>Th4</Text>
            <Text>Th5</Text>
            <Text>Th6</Text>
            <Text>Th7</Text>
            <Text>CN</Text>
          </View>
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
              windowSize={3}
              removeClippedSubviews={true}
              markedDates={markedDates}
              onDayPress={handleDayPress}
              minDate={moment().format('YYYY-MM-DD')}
              theme={{
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmDate}
              activeOpacity={0.7}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchCard: {
    backgroundColor: COLORS.primary,
    gap: 5,
    borderRadius: 8,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  inputRow: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 2,
    gap: 10,
  },
  pressedInput: {
    backgroundColor: '#f5f5f5',
  },
  inputText: {
    color: COLORS.black,
    flex: 1,
  },
  inputTextPlaceholder: {
    color: COLORS.gray,
    flex: 1,
  },
  dateTextContainer: {
    flex: 1,
    gap: 4,
  },
  dateLabel: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  dateValue: {
    color: COLORS.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
  },
  searchButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  searchButtonText: {
    paddingVertical: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  modalText: {
    color: COLORS.black,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 5,
  },
  modalButtonText: {
    color: '#0165FC',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'right',
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
  },
  calendarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: COLORS.secondary,
    width: '100%',
    gap: 10,
    borderRadius: 3,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SearchComponent;

// import React, {useState, useCallback, useRef, memo} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {BottomSheetModal} from '@gorhom/bottom-sheet';
// import moment from 'moment';
// import 'moment/locale/vi';

// import SearchLocationInput from './SearchLocationInput';
// import DateRangeInput from './DateRangeInput';
// import GuestInput from './GuestInput';
// import SearchButton from './SearchButton';
// import AlertModal from './AlertModal';
// import CalendarBottomSheet from './CalendarBottomSheet';

// import {
//   getCurrentDateFormatted,
//   getDefaultCheckOutDate,
// } from '../utils/constants';
// import {Location, SearchCondition, DateRange} from '../types/commonTypes';
// import {COLORS} from '../styles/colors';

// moment.locale('vi');

// type SearchComponentProps = {
//   location?: Location;
// };

// const SearchComponent = memo(({location}: SearchComponentProps) => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const bottomSheetRef = useRef<BottomSheetModal>(null);
//   const initialDate = getCurrentDateFormatted();

//   // Alert Modal state
//   const [alertModal, setAlertModal] = useState({
//     visible: false,
//     message: '',
//   });

//   // SearchCondition state
//   const [searchCondition, setSearchCondition] = useState<SearchCondition>({
//     checkInDate: initialDate,
//     checkOutDate: getDefaultCheckOutDate(initialDate),
//     location: location,
//     capacity: {
//       adults: 2,
//       children: 0,
//     },
//     rooms: 1,
//   });

//   // DateRange state
//   const [dateRange, setDateRange] = useState<DateRange>({
//     startDate: initialDate,
//     endDate: getDefaultCheckOutDate(initialDate),
//   });

//   // Alert Modal handlers
//   const openAlert = useCallback((message: string) => {
//     setAlertModal({visible: true, message});
//   }, []);

//   const closeAlert = useCallback(() => {
//     setAlertModal(prev => ({...prev, visible: false}));
//   }, []);

//   // Calendar Modal handlers
//   const openCalendar = useCallback(() => {
//     bottomSheetRef.current?.present();
//   }, []);

//   const closeCalendar = useCallback(() => {
//     bottomSheetRef.current?.dismiss();
//   }, []);

//   // Handlers
//   const handleLocation = useCallback(() => {
//     navigation.replace('SearchLocation', {location});
//   }, [navigation, location]);

//   const handleDayPress = useCallback((day: any) => {
//     const selectedDate = day.dateString;

//     // Kiểm tra ngày trong quá khứ
//     if (moment(selectedDate).isBefore(moment().startOf('day'))) {
//       return;
//     }

//     setDateRange(prev => {
//       if (!prev.startDate || (prev.startDate && prev.endDate)) {
//         // Chọn ngày bắt đầu mới
//         setSearchCondition(prevCondition => ({
//           ...prevCondition,
//           checkInDate: selectedDate,
//           checkOutDate: undefined,
//         }));
//         return {startDate: selectedDate, endDate: null};
//       } else {
//         // Đã có startDate, đang chọn endDate
//         if (moment(selectedDate).isAfter(prev.startDate)) {
//           setSearchCondition(prevCondition => ({
//             ...prevCondition,
//             checkOutDate: selectedDate,
//           }));
//           return {...prev, endDate: selectedDate};
//         } else {
//           setSearchCondition(prevCondition => ({
//             ...prevCondition,
//             checkInDate: selectedDate,
//             checkOutDate: undefined,
//           }));
//           return {startDate: selectedDate, endDate: null};
//         }
//       }
//     });
//   }, []);

//   const handleConfirmDate = useCallback(() => {
//     if (dateRange.startDate && !dateRange.endDate) {
//       openAlert('Vui lòng chọn ngày trả phòng');
//     } else {
//       closeCalendar();
//     }
//   }, [dateRange, closeCalendar, openAlert]);

//   const handleSearch = useCallback(() => {
//     if (searchCondition?.location?.address) {
//       if (!searchCondition.checkOutDate) {
//         openAlert('Vui lòng chọn ngày trả phòng');
//         return;
//       }
//       navigation.navigate('HotelSearchResults', {
//         searchCondition,
//       });
//     } else {
//       openAlert('Vui lòng nhập điểm đến của bạn');
//     }
//   }, [navigation, openAlert, searchCondition]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchCard}>
//         {/* Địa điểm */}
//         <SearchLocationInput
//           address={searchCondition?.location?.address}
//           onPress={handleLocation}
//         />

//         {/* Ngày nhận phòng và trả phòng */}
//         <DateRangeInput
//           checkInDate={searchCondition?.checkInDate}
//           checkOutDate={searchCondition?.checkOutDate}
//           onPress={openCalendar}
//         />

//         {/* Số lượng khách */}
//         <GuestInput
//           adults={searchCondition.capacity?.adults}
//           children={searchCondition.capacity?.children}
//           rooms={searchCondition.rooms}
//           onPress={() => {}} // To be implemented for guest selection
//         />

//         {/* Nút tìm kiếm */}
//         <SearchButton onPress={handleSearch} />
//       </View>

//       {/* Alert Modal */}
//       <AlertModal
//         visible={alertModal.visible}
//         message={alertModal.message}
//         onClose={closeAlert}
//       />

//       {/* Calendar BottomSheet */}
//       <CalendarBottomSheet
//         bottomSheetRef={bottomSheetRef}
//         dateRange={dateRange}
//         onDayPress={handleDayPress}
//         onConfirm={handleConfirmDate}
//       />
//     </View>
//   );
// });

// // Shared styles
// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   searchCard: {
//     backgroundColor: COLORS.yellowGold,
//     gap: 5,
//     borderRadius: 8,
//     padding: 5,
//     shadowColor: COLORS.black,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   inputRow: {
//     backgroundColor: COLORS.white,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 2,
//     gap: 10,
//   },
//   pressedInput: {
//     backgroundColor: '#f5f5f5',
//   },
//   inputText: {
//     color: COLORS.black,
//     flex: 1,
//   },
//   inputTextPlaceholder: {
//     color: COLORS.gray,
//     flex: 1,
//   },
//   searchButton: {
//     backgroundColor: COLORS.primary,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//     borderRadius: 2,
//   },
//   searchButtonText: {
//     paddingVertical: 14,
//     color: COLORS.white,
//     fontWeight: '500',
//   },
//   modalText: {
//     color: COLORS.black,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   modalButton: {
//     alignSelf: 'flex-end',
//     paddingHorizontal: 5,
//   },
//   modalButtonText: {
//     color: '#0165FC',
//     fontWeight: '500',
//     fontSize: 16,
//     textAlign: 'right',
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
//   },
//   calendarWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomButtonContainer: {
//     backgroundColor: COLORS.white,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -4},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   confirmButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 12,
//     backgroundColor: COLORS.primary,
//     width: '100%',
//     gap: 10,
//     borderRadius: 3,
//   },
//   confirmButtonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default SearchComponent;
