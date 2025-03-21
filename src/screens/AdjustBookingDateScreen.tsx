import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import IconComponent from '@components/IconComponent';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import moment from 'moment';
import {CalendarList} from 'react-native-calendars';
import 'moment/locale/vi';
moment.locale('vi'); // Đặt ngôn ngữ mặc định là tiếng Việt

const AdjustBookingDateScreen: React.FC = () => {
  const [selected, setSelected] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Tính toán ngày hiện tại
  const currentDate = moment().format('YYYY-MM-DD');
  console.log('currentDate', currentDate);
  console.log('startDate', startDate);
  console.log('endDate', endDate);

  // Highlight các ngày được chọn
  const markedDates: any = {};

  if (startDate) {
    markedDates[startDate] = {
      selected: true,
      startingDay: true,
      customStyles: {
        container: {
          backgroundColor: '#0165FC',
          borderTopLeftRadius: 6, // Bo góc trái trên
          borderBottomLeftRadius: 6, // Bo góc trái dưới
          borderTopRightRadius: 0, // Không bo góc phải trên
          borderBottomRightRadius: 0, // Không bo góc phải dưới
          width: '100%',
        },
        text: {color: 'white'},
      },
    };
  }

  if (endDate) {
    markedDates[endDate] = {
      selected: true,
      endingDay: true,
      customStyles: {
        container: {
          backgroundColor: '#0165FC',
          borderTopRightRadius: 6, // Bo góc phải trên
          borderBottomRightRadius: 6, // Bo góc phải dưới
          borderTopLeftRadius: 0, // Không bo góc trái trên
          borderBottomLeftRadius: 0, // Không bo góc trái dưới
          width: '100%',
        },
        text: {color: 'white'},
      },
    };
  }

  if (startDate && endDate) {
    let currentDate = moment(startDate).add(1, 'day');
    while (currentDate.isBefore(endDate)) {
      markedDates[currentDate.format('YYYY-MM-DD')] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: '#cccccc', // Màu nhạt hơn cho ngày ở giữa
            borderRadius: 0, // Không bo góc để các ngày nối liền nhau
            width: '100%',
          },
          text: {color: 'black'},
        },
      };
      currentDate.add(1, 'day');
    }
  }

  // Disable các ngày đã qua
  const disableDates: any = {};
  const today = moment(); // Ngày hiện tại (18/2)
  for (
    let date = moment().startOf('day');
    date.isBefore(today);
    date.add(1, 'day')
  ) {
    disableDates[date.format('YYYY-MM-DD')] = {
      disabled: true, // Disable ngày đã qua
      selectedColor: 'grey', // Màu mờ cho ngày đã qua
    };
  }

  // Chiều cao của thiết bị
  const height = Dimensions.get('window').height * 0.6;

  // variables
  const snapPoints = useMemo(() => ['60%'], []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
        <View style={{gap: 16}}>
          <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold'}}>
            Chọn ngày mới
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
            }}>
            Kiểm tra tình trạng trống tại chỗ nghỉ này vào các ngày mới
          </Text>
          <View
            style={{
              padding: 16,
              backgroundColor: '#fff',
              gap: 16,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              borderRadius: 4,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 10}}
              onPress={() => bottomSheetRef.current?.expand()}>
              <IconComponent
                name="calendar-multiselect"
                library="MaterialCommunityIcons"
                size={24}
                color="#000"
              />
              <View style={{gap: 4}}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>
                  Nhận phòng
                </Text>
                <Text style={{color: '#0165FC', fontWeight: 'bold'}}>
                  Thứ 3, 12 tháng 2, 2025
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{height: 1, backgroundColor: '#ccc'}}></View>
            <TouchableOpacity style={{flexDirection: 'row', gap: 10}}>
              <IconComponent
                name="calendar-outline"
                library="MaterialCommunityIcons"
                size={24}
                color="#000"
              />
              <View style={{gap: 4}}>
                <Text style={{color: '#000', fontWeight: 'bold'}}>
                  Trả phòng
                </Text>
                <Text style={{color: '#0165FC', fontWeight: 'bold'}}>
                  Thứ 3, 12 tháng 2, 2025
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 16,
          // Shadow properties
          shadowColor: '#000', // Màu của shadow
          shadowOffset: {width: 0, height: -15}, // Đổ bóng phía trên (height âm)
          shadowOpacity: 0.2, // Độ trong suốt của shadow
          shadowRadius: 3, // Độ mờ của shadow
          elevation: 10, // Hỗ trợ shadow trên Android
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#0165FC',
            width: '100%',
            gap: 10,
            borderRadius: 3,
          }}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
            Kiểm tra tình trạng phòng trống
          </Text>
        </TouchableOpacity>
      </View>
      {/* Bottom sheet số phòng */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enableContentPanningGesture={false}
        enablePanDownToClose={true}
        enableOverDrag={false}
        index={-1}
        snapPoints={[height]}
        handleIndicatorStyle={{
          width: '13%',
          backgroundColor: '#797979',
        }}>
        <View
          style={{
            paddingHorizontal: 32,
            paddingVertical: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text>Th2</Text>
          <Text>Th3</Text>
          <Text>Th4</Text>
          <Text>Th5</Text>
          <Text>Th6</Text>
          <Text>Th7</Text>
          <Text>CN</Text>
        </View>

        <BottomSheetView style={{flex: 1, gap: 16}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CalendarList
              pastScrollRange={0}
              futureScrollRange={12}
              showScrollIndicator={false}
              horizontal={false}
              calendarHeight={200}
              hideDayNames
              initialNumToRender={12}
              markingType="custom"
              windowSize={13}
              removeClippedSubviews={false}
              markedDates={markedDates} // Kết hợp các ngày đã chọn và ngày bị disable
              onDayPress={day => {
                const selectedDate = day.dateString;

                if (!startDate || (startDate && endDate)) {
                  // Nếu chưa có ngày bắt đầu hoặc đã chọn cả 2 ngày, reset lại từ đầu
                  setStartDate(selectedDate);
                  setEndDate(null);
                } else if (!endDate) {
                  // Nếu đã có ngày bắt đầu nhưng chưa có ngày kết thúc
                  if (moment(selectedDate).isAfter(startDate)) {
                    setEndDate(selectedDate);
                  } else {
                    // Nếu chọn ngày kết thúc trước ngày bắt đầu, đặt lại ngày bắt đầu
                    setStartDate(selectedDate);
                  }
                }
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              // Shadow properties
              shadowColor: '#000', // Màu của shadow
              shadowOffset: {width: 0, height: -15}, // Đổ bóng phía trên (height âm)
              shadowOpacity: 0.2, // Độ trong suốt của shadow
              shadowRadius: 3, // Độ mờ của shadow
              elevation: 10, // Hỗ trợ shadow trên Android
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                backgroundColor: '#0165FC',
                width: '100%',
                gap: 10,
                borderRadius: 3,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
                Kiểm tra tình trạng phòng trống
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default AdjustBookingDateScreen;

const styles = StyleSheet.create({});
