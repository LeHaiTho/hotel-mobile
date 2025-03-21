import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import IconComponent from '@components/IconComponent';
import SlideUpViewComponent from '@components/SlideUpViewComponent';
import RadioButtonComponent from '@components/RadioButtonComponent';
import CheckboxComponent from '@components/CheckboxComponent';

const BookingInfomationScreen = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<boolean>(true);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(true);

  // Mục đích chuyến đi
  const options = ['Vui chơi/ giải trí', 'Công tác'];
  const onClose = () => {
    setIsVisible(false);
  };
  const onOpen = () => {
    setIsVisible(true);
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: '#fff',
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{gap: 16}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              backgroundColor: '#fff',
              borderRadius: 3,
              borderWidth: 1,
              borderColor: '#0165FC',
              gap: 10,
            }}>
            <IconComponent
              name="user"
              size={18}
              library="SimpleLineIcons"
              color="#0165FC"
            />
            <Text style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
              Đăng nhập để tiết kiệm
            </Text>
          </TouchableOpacity>
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Tên{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput style={{flex: 1, color: '#000'}}></TextInput>

              <IconComponent
                name="checkmark-circle-outline"
                library="Ionicons"
                color="#058633"
              />
            </View>
            {/* error message*/}
            <Text style={{color: '#f20000', fontSize: 13}}>
              Vui lòng nhập họ của bạn
            </Text>
          </View>
          {/* Họ */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Họ{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput style={{flex: 1, color: '#000'}} />

              <IconComponent
                name="alert-circle-outline"
                library="Ionicons"
                color="#FF0000"
              />
            </View>
            {/* error message*/}
            {/* <Text style={{color: '#f20000', fontSize: 13}}>
            Vui lòng nhập họ của bạn
          </Text> */}
          </View>
          {/* Địa chỉ email */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Địa chỉ email{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput style={{flex: 1, color: '#000'}} />

              <IconComponent
                name="alert-circle-outline"
                library="Ionicons"
                color="#FF0000"
              />
            </View>
            {/* error message*/}
            {/* <Text style={{color: '#f20000', fontSize: 13}}>
            Vui lòng nhập họ của bạn
          </Text> */}
          </View>
          {/* Vùng quốc gia */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Vùng/quốc gia{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
                padding: 12,
              }}
              onPress={onOpen}>
              <Text style={{color: '#000'}}>Việt Nam</Text>

              <View
                style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                <IconComponent
                  name="alert-circle-outline"
                  library="Ionicons"
                  color="#FF0000"
                />
                <TouchableOpacity>
                  <IconComponent
                    name="chevron-down-sharp"
                    library="Ionicons"
                    color="#000"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {/* error message*/}
            {/* <Text style={{color: '#f20000', fontSize: 13}}>
            Vui lòng nhập họ của bạn
          </Text> */}
          </View>
          {/* Điện thại */}
          <View
            style={{
              gap: 5,
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '500',
              }}>
              Điện thoại{' '}
              <Text>
                <Text style={{color: '#f20000'}}>*</Text>
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                gap: 10,
                borderWidth: 1,
                borderColor: '#939394',
                borderRadius: 3,
              }}>
              <TextInput
                style={{flex: 1, color: '#000'}}
                keyboardType="phone-pad"
              />

              <IconComponent
                name="alert-circle-outline"
                library="Ionicons"
                color="#FF0000"
              />
            </View>
            {/* error message*/}
            {/* <Text style={{color: '#f20000', fontSize: 13}}>
            Vui lòng nhập họ của bạn
          </Text> */}
          </View>
        </View>

        {/* Mục đích chính chuyến đi của bạn */}
        <View
          style={{
            gap: 16,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: '500',
            }}>
            Mục đích chính chuyến đi của bạn là gì?
          </Text>
          <RadioButtonComponent
            options={options}
            initialSelected="Vui chơi/ giải trí"
            onSelect={option => {
              setSelectedPurpose(option);
            }}
          />
        </View>
        {/* Yêu cầu hóa đơn */}
        <View
          style={{
            gap: 16,
          }}>
          <Text
            style={{
              color: '#000',
            }}>
            Yêu cầu hóa đơn
          </Text>
          {/* Tôi muốn khách sạn xuất hóa đơn có thông tin địa chỉ công ty của mình */}
          <CheckboxComponent
            label="Tôi muốn khách sạn xuất hóa đơn có thông tin địa chỉ công ty của mình"
            checked={isChecked}
            onToggle={setIsChecked}
          />
        </View>
      </ScrollView>
      {/* Thêm chi tiết còn thiếu */}
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
            Thêm chi tiết còn thiếu
          </Text>
        </TouchableOpacity>
      </View>
      <SlideUpViewComponent visible={isVisible} onClose={onClose}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            gap: 16,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: '#000',
            }}>
            Vùng/quốc gia
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              gap: 10,
              borderWidth: 1,
              borderColor: '#939394',
              borderRadius: 3,
            }}>
            <TextInput
              style={{flex: 1, color: '#000'}}
              placeholder="Tìm quốc gia"
            />
          </View>
        </ScrollView>
      </SlideUpViewComponent>
    </>
  );
};

export default BookingInfomationScreen;

const styles = StyleSheet.create({});
