import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import IconComponent from '@components/IconComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const HotelSearchResultsScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Header + button search */}
      <StatusBar barStyle="light-content" backgroundColor="#003b95" />
      <View style={{paddingHorizontal: 16, backgroundColor: '#003b95'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderWidth: 4,
            borderColor: '#FFB700',
            borderRadius: 10,
            backgroundColor: '#fff',
          }}>
          <IconComponent
            name="arrow-left"
            library="MaterialCommunityIcons"
            size={24}
            color="#000"
          />
          <Text style={{color: '#000', flex: 1}}>
            Tp.Hồ Chính Minh 31 thg 1 - 3 thg 2
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: '#fff',
            marginHorizontal: -16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            zIndex: 1,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <IconComponent
              name="filter"
              library="MaterialCommunityIcons"
              size={20}
              color="#000"
            />
            <Text>Sắp xếp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <IconComponent
              name="filter"
              library="MaterialCommunityIcons"
              size={20}
              color="#000"
            />
            <Text>Sắp xếp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <IconComponent
              name="map-outline"
              library="Ionicons"
              size={20}
              color="#000"
            />
            <Text>Sắp xếp</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 16, gap: 10}}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          ListHeaderComponent={() => (
            <Text style={{color: '#000', paddingTop: 10}}>2574 chỗ nghỉ</Text>
          )}
          renderItem={() => (
            <View style={{}}>
              <TouchableOpacity
                onPress={() => console.log('Pressed')}
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  gap: 12,
                  flexDirection: 'row',
                }}>
                <Image
                  source={{
                    uri: 'https://www.huonggianghotel.com.vn/wp-content/uploads/2018/06/DSC_4211-HDR2_1600x1068-1.jpg',
                  }}
                  style={{
                    width: 100,
                    height: 'auto',
                    borderRadius: 8,
                    flex: 1,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    gap: 3,
                    flex: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 15,
                        lineHeight: 22,
                        flex: 1,
                      }}
                      numberOfLines={2}>
                      KT MERAKI BOUTIQUE - Bui vien walking street
                    </Text>
                    <TouchableOpacity style={{paddingHorizontal: 5}}>
                      <IconComponent
                        name="heart-o"
                        library="FontAwesome"
                        size={18}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#003b95',
                        padding: 4,
                        borderRadius: 4,
                        borderBottomLeftRadius: 0,
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                        }}>
                        7.1
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#000',
                      }}>
                      Tốt{' '}
                      <IconComponent
                        name="dot-single"
                        library="Entypo"
                        size={10}
                        color="#000"
                      />
                      <Text style={{color: 'gray', fontSize: 13}}>
                        100 đánh giá
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <EvilIcons name="location" size={20} color="#000" />
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 12,
                      }}>
                      Quận 1{' '}
                      <IconComponent
                        name="dot-single"
                        library="Entypo"
                        size={10}
                        color="#000"
                      />{' '}
                      <Text style={{fontSize: 12}}>cách trung tâm 100 m</Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#008234',
                      alignSelf: 'flex-start',
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#fff',
                      }}>
                      Ưu Đãi Đầu Năm 2025
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '600',
                        textAlign: 'right',
                      }}>
                      Giá cho 2 đêm, 2 người lớn
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: '#f20000',
                          textDecorationLine: 'line-through',
                          textAlign: 'right',
                        }}>
                        VNĐ 3.000.000
                      </Text>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 19,
                          textAlign: 'right',
                        }}>
                        VNĐ 1.350.000
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: 'right',
                      }}>
                      Đã bao gồm thuế và phí
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 5,
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={14}
                        color="#008234"
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          color: '#008234',
                          fontSize: 13,
                        }}>
                        Hủy miễn phí
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 5,
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={14}
                        color="#008234"
                      />
                      <Text
                        style={{
                          fontWeight: '700',
                          color: '#008234',
                          fontSize: 13,
                        }}>
                        Không cần thanh toán trước
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: 10,
                  marginHorizontal: -16,
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HotelSearchResultsScreen;

const styles = StyleSheet.create({});
