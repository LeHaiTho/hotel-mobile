import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';

// Tạo kiểu dữ liệu cho icon để đảm bảo nó có cấu trúc đúng
type IconType = {
  name: string;
  library:
    | 'AntDesign'
    | 'Ionicons'
    | 'SimpleLineIcons'
    | 'Feather'
    | 'MaterialCommunityIcons'
    | 'Foundation'
    | 'Fontisto'; // Removed duplicated AntDesign from here
};

// getIcon dùng để thay đổi các icon của menu nếu khác thư viện (fontawesome, ant-design, etc.)
const getIcon = (icon: IconType) => {
  switch (icon.library) {
    case 'AntDesign':
      return <AntDesign name={icon.name} size={20} color="#fff" />;
    case 'Ionicons':
      return <Ionicons name={icon.name} size={20} color="#fff" />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={icon.name} size={20} color="#fff" />;
    case 'Feather':
      return <Feather name={icon.name} size={20} color="#fff" />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={icon.name} size={20} color="#fff" />;
    case 'Foundation':
      return <Foundation name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
    case 'Fontisto':
      return <Fontisto name={icon.name} size={20} color="#fff" />; // Removed duplicated AntDesign from here
    default:
      return <Ionicons name={icon.name} size={20} color="#fff" />;
  }
};

// Khuyến mãi
const propotionData = [
  {
    id: 0,
    title: 'Genius',
    icon: {},
    description:
      'Lê ơi, bạn dang là Genius Cấp 1 trong chương trình khách hàng thân thiết của chúng tôi',
  },
  {
    id: 1,
    title: 'Giảm giá 10% cho chỗ nghỉ',
    name: 'Ưu đãi',
    icon: {name: 'percent', library: 'Feather'},
    description: 'Tận hưởng giảm giá tại các chỗ nghỉ tham gia trên toàn cầu',
  },
  {
    id: 2,
    title: 'Giảm giá 10% khi thuê xe',
    icon: {
      name: 'car',
      library: 'AntDesign',
    },
    description: 'Tiết kiệm cho một số xe cho thuê',
  },
  {
    id: 3,
    title: 'Giảm giá 15% cho chỗ nghỉ',
    icon: {
      name: 'calendar',
      library: 'Feather',
    },
    description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
  },
  {
    id: 4,
    title: 'Nâng hạng phòng miễn phí',
    icon: {
      name: 'calendar',
      library: 'Feather',
    },
    description: 'Hoàn tất 5 đơn đặt để mở khóa Genius Cấp 2',
  },
];

// Dữ liệu menu
const menuData = [
  {
    id: 1,
    title: 'Lưu trú',
    icon: {
      name: 'home-outline',
      library: 'Ionicons',
    },
  },
  {
    id: 2,
    title: 'Chuyến bay',
    icon: {
      name: 'plane',
      library: 'SimpleLineIcons',
    },
  },
  {
    id: 3,
    title: 'Thuê xe',
    icon: {
      name: 'car',
      library: 'AntDesign',
    },
  },
  {
    id: 4,
    title: 'Taxi',
    icon: {
      name: 'taxi',
      library: 'MaterialCommunityIcons',
    },
  },
  {
    id: 5,
    title: 'Địa điểm tham quan',
    icon: {
      name: 'map',
      library: 'Foundation',
    },
  },
];
const renderItem = ({item}: any) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      paddingHorizontal: 12,
      justifyContent: 'center',
      paddingVertical: 10,
      borderWidth: 0.7,
      borderColor: '#fff',
      gap: 8,
    }}>
    {getIcon(item.icon)}
    <Text
      style={{
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
      }}>
      {item.title}
    </Text>
  </TouchableOpacity>
);
const HomeScreen = () => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={menuData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 5,
          backgroundColor: '#003b95',
          paddingVertical: 10,
        }}
      />
      <ScrollView contentContainerStyle={{}}>
        {/* Tìm kiếm */}
        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <AntDesign name="search1" size={24} color="#000" />
            <Text
              style={{
                paddingVertical: 14,
                color: '#000',
              }}>
              Th6, 17 thg 1 - CN, 19 thg11
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <AntDesign name="calendar" size={24} color="#000" />
            <Text
              style={{
                paddingVertical: 14,
                color: '#000',
              }}>
              Th6, 17 thg 1 - CN, 19 thg11
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: -3,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <AntDesign name="user" size={24} color="#000" />
            <Text
              style={{
                paddingVertical: 14,
                color: '#000',
              }}>
              1 phòng - <Text>2 người lớn</Text> - <Text>0 trẻ em</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#0165FF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 16,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 3,
              borderColor: '#FFB700',
              gap: 10,
            }}>
            <Text
              style={{
                paddingVertical: 14,
                color: '#FFF',
                fontWeight: '500',
              }}>
              Tìm
            </Text>
          </TouchableOpacity>
        </View>
        {/* Khuyến mãi */}
        <View
          style={{
            paddingHorizontal: 16,
            gap: 10,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Đi nhiều hơn, trả ít hơn
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={propotionData}
            contentContainerStyle={{
              gap: 10,
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  padding: 14,
                  borderWidth: index === 0 ? 0 : 1,
                  borderColor:
                    index === 0
                      ? '#003b95'
                      : index === 1 || index === 2
                      ? '#0156ff'
                      : 'rgba(224, 224, 224, 0.9)',
                  borderRadius: 8,
                  marginBottom: 16,
                  backgroundColor:
                    index === 0
                      ? '#003b95'
                      : index === 1 || index === 2
                      ? '#fff'
                      : 'rgba(224, 224, 224, 0.5)',
                  gap: 10,
                  width: 200,
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    color: index === 0 ? '#fff' : '#000',
                    fontSize: index === 0 ? 18 : 14,
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: index === 0 ? '#fff' : '#000',
                    fontSize: index === 0 ? 14 : 12,
                  }}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
