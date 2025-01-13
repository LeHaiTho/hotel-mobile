// import React from 'react';
// import {Text, TextInput, TouchableOpacity, View} from 'react-native';

// const OTPVerificationScreen = () => {
//   return (
//     <View
//       style={{
//         paddingHorizontal: 16,
//         paddingTop: 32,
//         gap: 16,
//         backgroundColor: '#fff',
//       }}>
//       <View
//         style={{
//           gap: 5,
//         }}>
//         <Text
//           style={{
//             color: '#000',
//             fontSize: 24,
//             fontWeight: '700',
//           }}>
//           Xác minh địa chỉ email của bạn
//         </Text>
//         <Text
//           style={{
//             lineHeight: 22,
//             fontSize: 16,
//           }}>
//           Chúng tôi đã gửi xác minh đến <Text>deckmamay@gmail.com</Text>. Vui
//           lòng nhập mã này để tiếp tục.
//         </Text>
//       </View>
//       <View
//         style={{
//           gap: 16,
//         }}>
//         <View
//           style={{
//             gap: 5,
//           }}>
//           <TextInput
//             style={{
//               alignItems: 'center',
//               padding: 8,
//               backgroundColor: '#fff',
//               gap: 10,
//               borderWidth: 1,
//               borderColor: '#939394',
//               borderRadius: 3,
//             }}
//           />
//         </View>
//         <TouchableOpacity
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: 12,
//             backgroundColor: '#0165FC',
//             borderRadius: 3,
//           }}>
//           <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
//             Xác minh email
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OTPVerificationScreen;

import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Keyboard} from 'react-native';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Lưu trạng thái OTP
  const inputRefs = useRef<Array<TextInput | null>>([]); // Tham chiếu các ô nhập liệu

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text; // Cập nhật ký tự tại ô hiện tại
    setOtp(newOtp);

    // Di chuyển sang ô kế tiếp nếu nhập thành công
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Đóng bàn phím nếu nhập xong
    if (index === otp.length - 1 && text) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];

      // Nếu ô hiện tại có giá trị, xóa giá trị trong ô
      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      }
      // Nếu ô hiện tại rỗng, quay lại ô trước đó
      else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            value={value}
            onChangeText={
              text => handleChange(text.replace(/[^0-9]/g, ''), index) // Chỉ cho phép nhập số
            }
            onKeyPress={e => handleKeyPress(e, index)} // Xử lý xóa ký tự
            ref={ref => (inputRefs.current[index] = ref)} // Gắn tham chiếu ô
            maxLength={1} // Giới hạn 1 ký tự
            keyboardType="numeric"
            style={styles.input}
          />
        ))}
      </View>
      <Text style={styles.otpDisplay}>OTP: {otp.join('')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#fff',
  },
  otpDisplay: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default OTPVerificationScreen;
