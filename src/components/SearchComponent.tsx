import React, {useState, useEffect} from 'react';
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
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {API_URL} from '../utils/constants';

// Khai báo các constants
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
};

const SearchComponent = (location: SearchComponentProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  // const [locationText, setLocationText] = useState(location?.address || '');
  // const [checkInDate, setCheckInDate] = useState<string>('');
  // const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [searchCondition, setSearchCondition] =
    useState<initialSearchCondition>({
      checkInDate: '',
      checkOutDate: '',
      location: location?.location,
      capacity: {
        adults: 2,
        children: 0,
      },
    });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // const getAvailableCheckInDate = (): string => {
  //   const now = new Date();
  //   const currentMinutes = now.getHours() * 60 + now.getMinutes();
  //   console.log('currentMinutes', currentMinutes);
  //   const checkInLimit = 11 * 60 + 45;
  //   console.log('checkInLimit', checkInLimit);
  //   // Kiểm tra nếu đã quá giờ check-in (11:45)
  //   if (currentMinutes >= checkInLimit) {
  //     now.setDate(now.getDate() + 1);
  //   }
  //   return now.toLocaleDateString('en-CA').split('/').join('-');
  // };
  // console.log('getAvailableCheckInDate', getAvailableCheckInDate());
  // console.log('location', location);

  const getDefaultCheckOutDate = (checkInDateStr: string): string => {
    const checkIn = new Date(checkInDateStr);
    // Mặc định checkout sau 1 ngày
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toLocaleDateString('en-CA').split('/').join('-');
  };

  useEffect(() => {
    // Khởi tạo các giá trị mặc định
    // const initialCheckInDate = getAvailableCheckInDate();
    const initialCheckInDate = new Date()
      .toLocaleDateString('en-CA')
      .split('/')
      .join('-');
    setSearchCondition(prev => ({
      ...prev,
      checkInDate: initialCheckInDate,
      checkOutDate: getDefaultCheckOutDate(initialCheckInDate),
    }));
  }, []);

  // console.log('searchCondition', searchCondition);
  // console.log('checkInDate', searchCondition.checkInDate);
  // console.log('checkOutDate', searchCondition.checkOutDate);
  // lấy vị trí hiện tại hoặc điền vào input
  const handleLocation = () => {
    navigation.replace('SearchLocation', {
      location,
    });
  };

  // const handleSendRequest = async () => {
  //   try {
  //     const params = {
  //       location: searchCondition.location?.address,
  //       lat: searchCondition.location?.latitude,
  //       lon: searchCondition.location?.longitude,
  //       checkInDate: searchCondition.checkInDate,
  //       checkOutDate: searchCondition.checkOutDate,
  //       adults: searchCondition.capacity?.adults,
  //       children: searchCondition.capacity?.children,
  //     };
  //     console.log('params', params);

  //     // Xóa key có giá trị undefined
  //     const filteredParams = Object.fromEntries(
  //       Object.entries(params).filter(([_, v]) => v !== undefined),
  //     );
  //     console.log('filteredParams', filteredParams);

  //     // Tạo query string
  //     const queryString = new URLSearchParams(filteredParams as any).toString();
  //     console.log(queryString);
  //     const response = await axios.get(
  //       `${API_URL}/hotel-properties/searchresults?${queryString}`,
  //     );
  //     const data = response.data;
  //     console.log('data', data);
  //   } catch (error) {
  //     console.log('errord', error);
  //   }
  // };

  const handleSearch = async () => {
    try {
      if (searchCondition?.location?.address) {
        // console.log('searchCondition', searchCondition);
        // navigation.push('HotelSearchResults', {
        //   searchCondition,
        // });
        // format url
        // await handleSendRequest();
        navigation.navigate('HotelSearchResults', {
          searchCondition,
        });
      } else {
        openModal();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            {
              backgroundColor: pressed ? '#f5f5f5' : COLORS.white,
            },
          ]}
          onPress={handleLocation}>
          <AntDesign name="search1" size={24} color={COLORS.black} />
          {searchCondition?.location?.address ? (
            <Text style={styles.inputText}>
              {searchCondition?.location?.address}
            </Text>
          ) : (
            <Text style={styles.inputTextPlaceholder}>
              Nhập điểm đến của bạn
            </Text>
          )}
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            {
              backgroundColor: pressed ? '#f5f5f5' : COLORS.white,
            },
          ]}>
          <AntDesign name="calendar" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            {searchCondition?.checkInDate &&
              searchCondition?.checkOutDate &&
              formatDate(searchCondition?.checkInDate, true) +
                ' - ' +
                formatDate(searchCondition?.checkOutDate, true)}
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            {
              backgroundColor: pressed ? '#f5f5f5' : COLORS.white,
            },
          ]}>
          <AntDesign name="user" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            1 phòng - <Text>{searchCondition.capacity?.adults} người lớn</Text>{' '}
            - <Text>{searchCondition.capacity?.children} trẻ em</Text>
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.searchButton,
            pressed && styles.pressedButton,
          ]}
          onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Tìm</Text>
        </Pressable>
      </View>

      <ModalComponent modalVisible={modalVisible} closeModal={closeModal}>
        <Text style={styles.modalText}>Vui lòng nhập điểm đến của bạn</Text>
        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
          <Text style={styles.modalButtonText}>OK</Text>
        </TouchableOpacity>
      </ModalComponent>
    </View>
  );
};

// Tách styles ra riêng để dễ quản lý
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
    shadowRadius: 3,
    elevation: 4,
  },
  inputRow: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 2,
    gap: 10,
  },
  pressedState: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.7,
  },
  inputText: {
    paddingVertical: 12,
    color: COLORS.black,
  },
  inputTextPlaceholder: {
    color: COLORS.gray,
    paddingVertical: 12,
  },
  searchButton: {
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 2,
    gap: 10,
  },
  pressedButton: {
    opacity: 0.8,
  },
  searchButtonText: {
    paddingVertical: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  modalText: {
    color: COLORS.black,
    fontSize: 16,
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
});

export default SearchComponent;
