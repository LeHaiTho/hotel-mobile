import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';
import axios from 'axios';
import useAuthStore from '@stores/authStore';

GoogleSignin.configure({
  webClientId:
    '997402381071-psabl334fh76op0a77j8kghro055j6mo.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const {login} = useAuthStore();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult: any = await GoogleSignin.signIn();

      const idToken = signInResult.data?.idToken;
      if (!idToken) throw new Error('No ID token found');

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      const payload = {
        email: signInResult.data.user.email,
        uid: signInResult.data.user.uid,
        photo: signInResult.data.user.photo,
        lastname: signInResult.data.user.givenName,
        firstname: signInResult.data.user.familyName,
      };

      await logUser(payload);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const logUser = async (payload: any) => {
    try {
      const response = await axios.post(
        `http://192.168.1.115:5000/auth/login-with-google`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        await login(response.data.user, response.data.token);
        navigation.replace('Main');
      } else {
        Alert.alert('Lỗi đăng nhập', 'Vui lòng thử lại');
      }
    } catch (error: any) {
      console.log('error log user', error);
    }
  };

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
          }}
          onPress={onGoogleButtonPress}>
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
          Button, <Text>cũng như</Text>{' '}
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

// import {Button, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import {
//   GoogleSignin,
//   SignInResponse,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId:
//     '997402381071-psabl334fh76op0a77j8kghro055j6mo.apps.googleusercontent.com',
// });
// const LoginScreen = () => {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<any>();

//   // Handle user state changes
//   function onAuthStateChanged(user: any) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Button title="Sign in with Google" onPress={onGoogleButtonPress} />
//       </View>
//     );
//   }
//   async function onGoogleButtonPress() {
//     // Check if your device supports Google Play
//     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//     // Get the users ID token
//     const signInResult: any = await GoogleSignin.signIn();
//     console.log('signIn result', signInResult.data);
//     // Try the new style of google-sign in result, from v13+ of that module

//     let idToken = signInResult.data?.idToken;
//     if (!idToken) {
//       // if you are using older versions of google-signin, try old style result
//       idToken = signInResult.idToken;
//     }
//     if (!idToken) {
//       throw new Error('No ID token found');
//     }

//     // Create a Google credential with the token
//     const googleCredential = auth.GoogleAuthProvider.credential(
//       signInResult.data.idToken,
//     );

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(googleCredential);
//   }
//   const signOut = async () => {
//     try {
//       await auth().signOut();
//       await GoogleSignin.signOut();
//       setUser(null);
//     } catch (error) {
//       console.error('Sign Out Error', error);
//     }
//   };
//   return (
//     <View>
//       {user && <Text>{user?.email}</Text>}
//       <Button title="Sign Out" onPress={signOut} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});
