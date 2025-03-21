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

// Khai báo các constants
const COLORS = {
  primary: '#FFB700',
  secondary: '#0165FF',
  white: '#FFFFFF',
  black: '#000000',
};

const SearchComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getAvailableCheckInDate = (): string => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const checkInLimit = 11 * 60 + 45;
    // Kiểm tra nếu đã quá giờ check-in (11:45)
    if (currentMinutes >= checkInLimit) {
      now.setDate(now.getDate() + 1);
    }
    return now.toISOString().split('T')[0];
  };

  const getDefaultCheckOutDate = (checkInDateStr: string): string => {
    const checkIn = new Date(checkInDateStr);
    // Mặc định checkout sau 1 ngày
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split('T')[0];
  };

  useEffect(() => {
    // Khởi tạo các giá trị mặc định
    const initialCheckInDate = getAvailableCheckInDate();
    console.log('initialCheckInDate', initialCheckInDate);
    setLocation('hello');
    setCheckInDate(initialCheckInDate);
    setCheckOutDate(getDefaultCheckOutDate(initialCheckInDate));
  }, []);

  const handleSearch = () => {
    if (location) {
      navigation.navigate('SearchLocation');
    } else {
      openModal();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchCard}>
        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedState,
          ]}>
          <AntDesign name="search1" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>{location}</Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedState,
          ]}>
          <AntDesign name="calendar" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            {formatDate(checkInDate)} - {formatDate(checkOutDate)}
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => [
            styles.inputRow,
            pressed && styles.pressedState,
          ]}>
          <AntDesign name="user" size={24} color={COLORS.black} />
          <Text style={styles.inputText}>
            1 phòng - <Text>2 người lớn</Text> - <Text>0 trẻ em</Text>
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
    paddingVertical: 14,
    color: COLORS.black,
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
