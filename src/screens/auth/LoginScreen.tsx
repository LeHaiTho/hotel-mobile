import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {googleLogo} from '../../assets/icons/index';

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 16,
        paddingVertical: 26,
        gap: 20,
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Text
        style={{
          color: '#000',
          fontSize: 24,
          fontWeight: 'bold',
        }}>
        Đăng nhập để dễ dàng truy cập thông tin chuyến đi
      </Text>

      {/* social button */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#fff',
            gap: 10,
            width: '100%',
            borderWidth: 1,
            borderColor: '#939394',
            borderRadius: 3,
          }}>
          <Image
            source={require('../../assets/icons/logo/google-icon.png')}
            style={{width: 20, height: 20, backgroundColor: '#fff'}}
          />
          <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
            Tiếp tục bằng tài khoản Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            backgroundColor: '#fff',
            width: '100%',
            gap: 10,
            borderWidth: 1,
            borderColor: '#939394',
            borderRadius: 3,
          }}>
          <Image
            source={require('../../assets/icons/logo/facebook-image.png')}
            style={{width: 20, height: 20}}
          />
          <Text style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
            Tiếp tục bằng tài khoản Facebook
          </Text>
        </TouchableOpacity>
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
            Tiếp tục với email
          </Text>
        </TouchableOpacity>
      </View>

      {/* thông tin chân trang */}
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          gap: 10,
          paddingBottom: 26,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
          }}>
          Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các{' '}
          <Text
            style={{
              color: '#0165FF',
              textDecorationLine: 'underline',
            }}>
            Điều khoản và Điều kiện
          </Text>{' '}
          <Text>cũng như</Text>{' '}
          <Text
            style={{
              color: '#0165FF',
              textDecorationLine: 'underline',
            }}>
            Chính sách An toàn và Bảo mật
          </Text>{' '}
          <Text>của chúng tôi</Text>
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontSize: 12,
          }}>
          {'\u00A9'} 2025 Booking.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

LoginScreen.propTypes = {};

export default LoginScreen;
