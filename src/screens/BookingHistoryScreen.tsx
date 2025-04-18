import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Dimensions} from 'react-native';
import {COLORS} from '@styles/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';

const initialLayout = {width: Dimensions.get('window').width};

const TripCard = ({location, date}: {location: string; date: string}) => (
  <Pressable
    style={({pressed}) => [
      {
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
      },
      pressed && {
        opacity: 0.5,
      },
    ]}>
    <Image
      source={{
        uri: 'https://iwater.vn/Image/Picture/New/333/giao_nuoc_laVie_thu_dau_mot.jpg',
      }}
      style={{
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    />
    <View
      style={{
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{}}>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {location}
        </Text>
        <Text style={styles.cardSubtitle}>{date}</Text>
      </View>
      <Feather name="chevron-right" size={24} color={COLORS.black} />
    </View>
  </Pressable>
);

const CanceledTripCard = ({
  id,
  title,
  checkinDate,
  checkoutDate,
  status,
  image,
  price,
  onPress,
  onOpenBottomsheet,
}: {
  id: string;
  title: string;
  checkinDate: string;
  checkoutDate: string;
  status: string;
  image: string;
  price: string;
  onPress: () => void;
  onOpenBottomsheet?: () => void;
}) => {
  return (
    <>
      <Pressable
        style={({pressed}) => {
          return {
            backgroundColor: pressed ? COLORS.grayLight : COLORS.white,
            padding: 16,
            borderRadius: 8,
            borderColor: COLORS.grayLight,
            shadowColor: COLORS.black,
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 5,
            gap: 10,
          };
        }}
        onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <Image
            source={{
              uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 6,
              resizeMode: 'cover',
            }}
          />
          <View style={{flexDirection: 'column', gap: 5}}>
            <Text style={{color: COLORS.black, fontWeight: 'bold'}}>
              New hotel & Apartment
            </Text>
            <View>
              <Text style={{color: COLORS.black}}>{checkinDate}</Text>
              <Text style={{color: COLORS.black}}>
                VNĐ {Number(price).toLocaleString()}
              </Text>
            </View>
            <Text style={{color: COLORS.gray}}>Đã hủy </Text>
          </View>
        </View>
        <Pressable
          style={({pressed}) => [
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              borderTopWidth: 1,
              borderColor: COLORS.grayLight,
              marginHorizontal: -16,
              paddingHorizontal: 16,
              paddingTop: 16,
              marginBottom: -16,
              paddingBottom: 16,
              justifyContent: 'space-between',
              backgroundColor: pressed ? COLORS.grayLight : 'transparent',
            },
          ]}
          onPress={onOpenBottomsheet}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons
              name="information-circle-outline"
              color={'brown'}
              size={24}
            />
            <Text style={{color: COLORS.black}}>Thông tin hủy và đặt lại</Text>
          </View>
          <EvilIcons name="chevron-right" color={COLORS.black} size={24} />
        </Pressable>
      </Pressable>
    </>
  );
};

const ActiveTrips = () => (
  // <FlatList
  //   contentContainerStyle={{
  //     padding: 16,
  //   }}
  //   data={[
  //     {
  //       id: '1',
  //       location: 'Thủ Dầu Một',
  //       date: '10 thg 4 - 11 thg 4 · 1 đơn đặt',
  //     },
  //   ]}
  //   keyExtractor={item => item.id}
  //   renderItem={({item}) => (
  //     <TripCard location={item.location} date={item.date} />
  //   )}
  // />
  <View
    style={{
      flex: 1,
      padding: 16,
      alignItems: 'center',
      gap: 12,
      paddingTop: '30%',
      backgroundColor: COLORS.white,
    }}>
    <Image
      source={{
        uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsGlobe.png',
      }}
      style={{width: 180, height: 180, marginBottom: 20}}
    />
    <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
      Đi đâu tiếp đây?
    </Text>
    <Text
      style={{
        color: COLORS.black,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
      }}>
      Bạn chưa có chuyến đi nào cả. Sau khi bạn đặt chỗ, đơn đó sẽ xuất hiện tại
      đây.
    </Text>
  </View>
);

const PastTrips = () => (
  <View
    style={{
      flex: 1,
      padding: 16,
      alignItems: 'center',
      gap: 12,
      marginTop: '10%',
      backgroundColor: COLORS.white,
    }}>
    <Image
      source={{
        uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsEmptyScreenComplete.png',
      }}
      style={{width: 260, height: 260}}
    />
    <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
      Xem lại các chuyến đi đã qua
    </Text>
    <Text
      style={{
        color: COLORS.black,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
      }}>
      Tại đây, bạn có thể xem lại tất cả chuyến đi qua và lấy cảm hứng cho những
      chuyến tới
    </Text>
  </View>
);

const CanceledTrips = ({
  handleOpenBottomSheet,
}: {
  handleOpenBottomSheet: (data: any) => void;
}) => (
  // <View
  //   style={{
  //     flex: 1,
  //     padding: 16,
  //     alignItems: 'center',
  //     gap: 12,
  //     marginTop: '10%',
  //     backgroundColor: COLORS.white,
  //   }}>
  //   <Image
  //     source={{
  //       uri: 'https://t-cf.bstatic.com/design-assets/assets/v3.142.0/illustrations-traveller/TripsEmptyScreenCancelled.png',
  //     }}
  //     style={{width: 220, height: 220}}
  //   />
  //   <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
  //     Đôi lúc kế hoạch bị thay đổi
  //   </Text>
  //   <Text
  //     style={{
  //       color: COLORS.black,
  //       fontSize: 16,
  //       textAlign: 'center',
  //       lineHeight: 22,
  //     }}>
  //     Bạn sẽ thấy tất cả chuyến đi bạn đã hủy tại đây. Để dành cho lần tới
  //     chăng?
  //   </Text>
  // </View>
  <FlatList
    contentContainerStyle={{
      padding: 16,
      flex: 1,
    }}
    data={[
      {
        id: '1',
        title: 'New hotel & Apartment',
        checkinDate: '10 thg 4 - 12 thg 4',
        checkoutDate: '10 thg 4 - 12 thg 4',
        status: 'Đã xác nhận',
        image:
          'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
        price: '1000000',
      },
    ]}
    renderItem={({item}) => (
      <CanceledTripCard
        id={item.id}
        title={item.title}
        checkinDate={item.checkinDate}
        checkoutDate={item.checkoutDate}
        status={item.status}
        image={item.image}
        price={item.price}
        onPress={() => console.log('Pressed')}
        onOpenBottomsheet={() => {
          handleOpenBottomSheet(item);
        }}
      />
    )}
    keyExtractor={item => item?.id}
  />
);

const renderScene = SceneMap({
  active: ActiveTrips,
  past: PastTrips,
  canceled: CanceledTrips,
});

const TripScreen = () => {
  const [index, setIndex] = useState(0);
  const [bottomSheetData, setBottomSheetData] = useState<any>(null);
  const {dismiss} = useBottomSheetModal();
  const [routes] = useState([
    {key: 'active', title: 'Đang hoạt động'},
    {key: 'past', title: 'Đã qua'},
    {key: 'canceled', title: 'Đã huỷ'},
  ]);

  const snapPoints = useMemo(() => ['53%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenBottomSheet = (data: any) => {
    console.log('data', data);
    setBottomSheetData(data);
    bottomSheetRef.current?.present();
  };

  const handleCloseBottomSheet = () => {
    dismiss();
  };

  // Backdrop render function
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <TabView
        navigationState={{index, routes}}
        // renderScene={renderScene}
        renderScene={({route}) => {
          // Truyền handleOpenBottomSheet vào route components
          switch (route.key) {
            case 'active':
              return <ActiveTrips />;
            case 'past':
              return <PastTrips />;
            case 'canceled':
              return (
                <CanceledTrips handleOpenBottomSheet={handleOpenBottomSheet} />
              );
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          shadowColor: 'none',
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'transparent'}}
            activeColor={COLORS.primary}
            inactiveColor={COLORS.black}
            indicatorContainerStyle={{
              backgroundColor: '#fff',
              shadowColor: 'none',
            }}
            // contentContainerStyle={{
            //   backgroundColor: 'white',
            // }}
          />
        )}
      />
      {/* Bottom Sheet ở cấp Screen */}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        enableContentPanningGesture={false}
        overDragResistanceFactor={0}
        backdropComponent={renderBackdrop}>
        <BottomSheetView
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 16,
            paddingBottom: 25,
            gap: 16,
          }}>
          <Text style={{color: COLORS.black, fontSize: 22, fontWeight: 'bold'}}>
            Thông tin hủy và đặt lại
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              padding: 16,
              borderRadius: 10,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              shadowColor: COLORS.black,
              shadowOpacity: 0.2,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 8,
              elevation: 6,
            }}>
            <Image
              source={{
                uri: 'https://q-xx.bstatic.com/xdata/images/city/608x352/977261.webp?k=6e056b414cda72f979d7227aff6f5cb43035a30555649dce0292bae146ba4d57&o=',
              }}
              style={{width: 45, height: 45, borderRadius: 5}}
            />
            <View>
              <Text style={{fontWeight: 'bold', color: COLORS.black}}>
                Sky hotel
              </Text>
              <Text style={{color: COLORS.black}}>
                10 thg 4 - 12 thg 4 - Đã hủy
              </Text>
            </View>
          </View>
          <View style={{gap: 5}}>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              Bạn đã hủy đơn đặt này vào{' '}
              <Text style={{fontWeight: '700'}}>10 thg 4, 2025</Text>
            </Text>
            <Text style={{color: COLORS.black, fontSize: 16}}>
              Dịch vụ Khách hàng không thể hoàn tác việc hủy đặt chỗ
            </Text>
          </View>
          <Text style={{color: COLORS.black, fontSize: 16}}>
            Nếu vẫn muốn lưu trú tại chỗ nghỉ này bạn sẽ cần đặt lại hoặc tìm
            lựa chọn thay thế.
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.primary,
              padding: 12,
              borderRadius: 5,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}}>
              Xem tình trạng phòng trống
            </Text>
          </TouchableOpacity>
          {/* {bottomSheetData && (
            <View style={styles.bottomSheetBody}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tên khách sạn:</Text>
                <Text style={styles.infoValue}>{bottomSheetData.title}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ngày đặt:</Text>
                <Text style={styles.infoValue}>
                  {bottomSheetData.checkinDate}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ngày hủy:</Text>
                <Text style={styles.infoValue}>15 thg 3, 2025</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phí hủy:</Text>
                <Text style={styles.infoValue}>VNĐ 0</Text>
              </View>

              <Pressable
                style={styles.rebookButton}
                onPress={() => {
                  bottomSheetRef.current?.close();
                  // Thêm logic đặt lại phòng ở đây
                }}>
                <Text style={{color: COLORS.black}}>Đặt lại phòng này</Text>
              </Pressable>
            </View>
          )} */}
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'transparent', // Transparent background
  },
  tabLabelContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabelContainerFocused: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  tabLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  bottomSheetContent: {
    flex: 1,
    gap: 16,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  bottomSheetBody: {
    marginTop: 16,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  rebookButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  rebookButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TripScreen;

// src/screens/BookingHistoryScreen.tsx
// import React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
// import {useBottomSheet} from '../context/BottomSheetContext';
// import {COLORS} from '../styles/colors';

// const BottomSheetContent = React.memo(() => {
//   const {closeBottomSheet} = useBottomSheet();
//   return (
//     <View style={styles.sheetContainer}>
//       <Text style={styles.title}>Nội dung Bottom Sheet</Text>
//       <Text style={styles.description}>
//         Đây là nội dung tùy chỉnh cho bottom sheet.
//       </Text>
//       <Button title="Đóng" onPress={closeBottomSheet} />
//     </View>
//   );
// });

// const BookingHistoryScreen: React.FC = () => {
//   const {showBottomSheet} = useBottomSheet();

//   const handleOpenBottomSheet = () => {
//     showBottomSheet(<BottomSheetContent />, ['70%'], () =>
//       console.log('Bottom sheet closed'),
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.screenTitle}>Lịch sử đặt phòng</Text>
//       <Button title="Mở Bottom Sheet" onPress={handleOpenBottomSheet} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.white,
//   },
//   screenTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   sheetContainer: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 14,
//     marginBottom: 20,
//   },
// });

// export default BookingHistoryScreen;

// import {Button, StyleSheet, Text, View} from 'react-native';
// import React, {useCallback, useMemo, useRef} from 'react';
// import TestBottomSheetModal from '@components/BottomSheetModal/TestBottomSheetModal';
// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';

// const BookingHistoryScreen = () => {
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const snapPoints = useMemo(() => [], []);
//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);
//   const renderBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         {...props}
//         appearsOnIndex={0} // Backdrop xuất hiện khi Bottom Sheet ở snap point đầu tiên
//         disappearsOnIndex={-1} // Backdrop biến mất khi Bottom Sheet đóng
//         opacity={0.7} // Độ trong suốt của backdrop (0 - trong suốt, 1 - hoàn toàn mờ)
//         pressBehavior="none"
//       />
//     ),
//     [],
//   );
//   return (
//     <>
//       <Button
//         onPress={handlePresentModalPress}
//         title="Present Modal"
//         color="black"
//       />
//       <BottomSheetModal
//         ref={bottomSheetModalRef}
//         onChange={handleSheetChanges}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         enableDismissOnClose={true}
//         backdropComponent={renderBackdrop}>
//         <BottomSheetView style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheetModal>
//     </>
//   );
// };

// export default BookingHistoryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });
