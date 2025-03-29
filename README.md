This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

CẤU TRÚC TỔ CHỨC
my-react-native-app/
├── android/ # Thư mục chứa mã nguồn Android
├── ios/ # Thư mục chứa mã nguồn iOS
├── src/ # Thư mục chứa mã nguồn chính của ứng dụng
│ ├── assets/ # Chứa các tài nguyên tĩnh (hình ảnh, font, JSON, v.v.)
│ │ ├── images/ # Hình ảnh
│ │ ├── fonts/ # Font chữ
│ │ └── data/ # Dữ liệu JSON hoặc file tĩnh khác
│ ├── components/ # Chứa các component tái sử dụng
│ │ ├── common/ # Component chung (Button, Input, v.v.)
│ │ ├── ui/ # Component UI (Modal, Card, v.v.)
│ │ └── ... # Các component khác
│ ├── constants/ # Chứa các hằng số (màu sắc, kích thước, API endpoints, v.v.)
│ ├── navigation/ # Quản lý điều hướng (React Navigation)
│ │ ├── AppNavigator.js # Cấu hình chính của navigation
│ │ ├── stacks/ # Các stack navigator
│ │ ├── tabs/ # Các tab navigator
│ │ └── ... # Các loại navigator khác
│ ├── screens/ # Chứa các màn hình (screens) của ứng dụng
│ │ ├── HomeScreen/ # Màn hình Home
│ │ ├── ProfileScreen/ # Màn hình Profile
│ │ └── ... # Các màn hình khác
│ ├── services/ # Chứa các service (API calls, network, v.v.)
│ ├── store/ # Quản lý state (Redux, Zustand, v.v.)
│ │ ├── slices/ # Redux slices (nếu dùng Redux Toolkit)
│ │ ├── actions/ # Redux actions (nếu dùng Redux)
│ │ ├── reducers/ # Redux reducers (nếu dùng Redux)
│ │ └── store.js # Cấu hình store
│ ├── hooks/ # Chứa các custom hooks
│ ├── utils/ # Chứa các hàm tiện ích (helpers, formatters, v.v.)
│ ├── contexts/ # Chứa các React Context (nếu sử dụng)
│ ├── theme/ # Chứa cấu hình theme (màu sắc, font, spacing, v.v.)
│ ├── App.js # File entry point của ứng dụng
│ └── index.js # File khởi chạy ứng dụng
├── .env # File cấu hình môi trường
├── .eslintrc.js # Cấu hình ESLint
├── .prettierrc.js # Cấu hình Prettier
├── babel.config.js # Cấu hình Babel
├── metro.config.js # Cấu hình Metro Bundler
├── package.json # File quản lý dependencies
└── README.md # Tài liệu dự án
my-react-native-app/
├── **tests**/
│ └── App.test.js
├── android/
├── ios/
├── src/
│ ├── assets/
│ │ ├── images/
│ │ └── fonts/
│ ├── components/
│ │ ├── Button/
│ │ └── Input/
│ ├── config/
│ │ ├── colors.js
│ │ └── api.js
│ ├── constants/
│ │ └── routes.js
│ ├── context/
│ │ └── AuthContext.js
│ ├── hooks/
│ │ └── useFetch.js
│ ├── navigation/
│ │ └── AppNavigator.js
│ ├── screens/
│ │ ├── Home/
│ │ └── Profile/
│ ├── services/
│ │ └── apiService.js
│ ├── store/
│ │ ├── actions/
│ │ ├── reducers/
│ │ └── store.js
│ ├── styles/
│ │ └── globalStyles.js
│ ├── utils/
│ │ └── dateFormatter.js
│ └── App.js
├── .env
├── .eslintrc.js
├── .prettierrc.js
├── babel.config.js
├── metro.config.js
├── package.json
└── README.md
màu sắc:
#003b95
#E5E5E5
#666666
#D8E7FA
#FFB700
#058633

<!-- Nút gửi tin nhắn -->

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

<TouchableOpacity
style={{
                      paddingVertical: 10,
                    }}>
<Text
style={{
                        color: '#0165FC',
                        fontWeight: '600',
                        fontSize: 16,
                      }}>
Xem tất cả
</Text>
</TouchableOpacity>

// "react-native-gesture-handler": "^2.9.0",
// "react-native-safe-area-context": "^4.10.1",
// "react-native-screens": "^4.4.0",
// "@gorhom/bottom-sheet": "^5.0.6",
// "@react-native-masked-view/masked-view": "^0.3.2",
// "@react-navigation/bottom-tabs": "^7.2.0",
// "@react-navigation/elements": "^2.2.5",
// "@react-navigation/native": "^7.0.14",
// "@react-navigation/native-stack": "^7.2.0",
// "@react-navigation/stack": "^7.1.1",

Booking.com là một trong những nền tảng đặt phòng khách sạn lớn nhất thế giới, cung cấp nhiều tính năng đa dạng và tiện ích để hỗ trợ người dùng trong việc tìm kiếm, đặt chỗ và quản lý đặt phòng. Dưới đây là các chức năng chính của ứng dụng Booking.com hiện tại:

1. Tìm kiếm khách sạn
   Tìm kiếm theo địa điểm: Người dùng có thể tìm kiếm khách sạn theo thành phố, điểm đến, hoặc địa điểm cụ thể.

Lọc kết quả:

Theo giá cả, hạng sao, loại chỗ ở (khách sạn, căn hộ, biệt thự, v.v.).

Theo tiện ích (wifi miễn phí, bể bơi, bữa sáng, v.v.).

Theo khoảng cách từ trung tâm hoặc địa điểm nổi tiếng.

Bản đồ tích hợp: Hiển thị vị trí khách sạn trên bản đồ để người dùng dễ dàng lựa chọn.

2. Đặt phòng
   Đặt phòng nhanh chóng: Người dùng có thể đặt phòng trực tiếp trên ứng dụng.

Thanh toán linh hoạt:

Thanh toán trực tuyến bằng thẻ tín dụng, ví điện tử, hoặc các phương thức thanh toán khác.

Tùy chọn thanh toán tại khách sạn (Pay at Property).

Xác nhận ngay lập tức: Nhận email và thông báo xác nhận đặt phòng ngay sau khi hoàn tất.

3. Quản lý đặt phòng
   Xem chi tiết đặt phòng: Người dùng có thể xem thông tin về khách sạn, ngày nhận phòng, ngày trả phòng, giá cả, và chính sách hủy phòng.

Chỉnh sửa đặt phòng: Thay đổi thông tin đặt phòng (nếu khách sạn cho phép).

Hủy đặt phòng: Hủy phòng trực tiếp trên ứng dụng (nếu chính sách hủy phòng cho phép).

4. Đánh giá và nhận xét
   Đọc đánh giá: Người dùng có thể xem đánh giá và nhận xét từ những khách hàng đã từng ở tại khách sạn.

Viết đánh giá: Sau khi hoàn thành chuyến đi, người dùng có thể viết đánh giá và chia sẻ trải nghiệm của mình.

5. Ưu đãi và khuyến mãi
   Giá ưu đãi: Hiển thị các ưu đãi đặc biệt, giảm giá, hoặc gói dịch vụ hấp dẫn.

Chương trình thành viên Genius: Người dùng có thể đăng ký chương trình thành viên để nhận ưu đãi độc quyền.

6. Hỗ trợ khách hàng
   Trò chuyện trực tiếp: Người dùng có thể liên hệ với bộ phận hỗ trợ khách hàng qua chat trực tiếp trên ứng dụng.

Câu hỏi thường gặp (FAQ): Cung cấp thông tin giải đáp các thắc mắc phổ biến.

7. Lưu trữ yêu thích
   Danh sách yêu thích: Người dùng có thể lưu các khách sạn yêu thích để xem lại sau.

Nhắc nhở đặt phòng: Nhận thông báo khi giá phòng giảm hoặc khi khách sạn sắp hết phòng.

8. Tích hợp các dịch vụ khác
   Đặt vé máy bay: Người dùng có thể đặt vé máy bay kết hợp với đặt phòng khách sạn.

Thuê xe: Tích hợp dịch vụ thuê xe để thuận tiện cho chuyến đi.

Tour và hoạt động: Đặt các tour du lịch hoặc hoạt động giải trí tại điểm đến.

9. Thông báo và nhắc nhở
   Thông báo giá: Nhận thông báo khi giá phòng thay đổi.

Nhắc nhở đặt phòng: Nhắc nhở người dùng đặt phòng nếu họ đã xem một khách sạn nhiều lần.

Thông báo chuyến đi: Nhắc nhở về ngày nhận phòng, ngày trả phòng, và các thông tin liên quan đến chuyến đi.

10. Đa ngôn ngữ và đa tiền tệ
    Hỗ trợ nhiều ngôn ngữ: Ứng dụng hỗ trợ nhiều ngôn ngữ để phục vụ người dùng toàn cầu.

Chuyển đổi tiền tệ: Người dùng có thể xem giá phòng bằng nhiều loại tiền tệ khác nhau.

11. Chế độ Offline
    Truy cập thông tin đặt phòng offline: Người dùng có thể xem thông tin đặt phòng ngay cả khi không có kết nối internet.

12. Bảo mật và an toàn
    Bảo mật thông tin: Đảm bảo thông tin cá nhân và thanh toán của người dùng được bảo vệ.

Xác thực hai lớp: Tăng cường bảo mật cho tài khoản người dùng.

13. Tích hợp với các nền tảng khác
    Liên kết với Google Maps: Giúp người dùng dễ dàng tìm đường đến khách sạn.

Tích hợp với Apple Wallet/Google Pay: Lưu thông tin đặt phòng vào ví điện tử để tiện theo dõi.

14. Chức năng dành cho chủ khách sạn
    Quản lý đặt phòng: Chủ khách sạn có thể quản lý đặt phòng, cập nhật thông tin phòng, và xem đánh giá từ khách hàng.

Nhận thông báo: Nhận thông báo về các đặt phòng mới hoặc yêu cầu từ khách hàng.

<!-- Công việc ngày 15/2 -->

npm i react-native-calendars

<!-- Quy trình github -->

🔥 Quy trình làm việc với Git theo từng chức năng
🛠️ Pull code mới nhất từ remote repository
Trước khi bắt đầu làm việc, luôn đảm bảo code của bạn cập nhật mới nhất từ nhánh chính (main hoặc develop):

sh
Sao chép
Chỉnh sửa
git checkout develop # Chuyển sang nhánh develop (hoặc main)
git pull origin develop # Lấy code mới nhất
📌 Tạo nhánh mới cho từng chức năng
Mỗi chức năng mới nên có một nhánh riêng để dễ quản lý:

sh
Sao chép
Chỉnh sửa
git checkout -b feature/ten-chuc-nang
Ví dụ: Nếu bạn đang làm tính năng đăng nhập, bạn có thể đặt tên nhánh là:

sh
Sao chép
Chỉnh sửa
git checkout -b feature/login
👨‍💻 Code & Commit từng thay đổi nhỏ
Khi viết code, nên chia commit thành từng phần nhỏ, mỗi commit thể hiện một bước quan trọng:

sh
Sao chép
Chỉnh sửa
git add . # Thêm tất cả file thay đổi vào staging
git commit -m "Thêm giao diện đăng nhập"
👉 Lưu ý: Viết commit message rõ ràng và có ý nghĩa.

🔄 Luôn đồng bộ với nhánh chính
Trước khi push code lên, bạn nên pull code mới nhất từ nhánh chính (develop hoặc main) để tránh conflict:

sh
Sao chép
Chỉnh sửa
git checkout develop # Chuyển sang nhánh chính
git pull origin develop # Lấy code mới nhất
git checkout feature/login # Quay lại nhánh tính năng
git merge develop # Gộp code mới nhất vào nhánh đang làm
Nếu có conflict, bạn cần giải quyết xung đột, sau đó commit lại.

🚀 Push code lên GitHub
Khi hoàn thành tính năng, bạn push code lên repository:

sh
Sao chép
Chỉnh sửa
git push origin feature/login
📢 Tạo Pull Request (PR) để merge vào develop/main

Vào GitHub/GitLab/Bitbucket
Tạo Pull Request (PR) từ feature/login vào develop
Chờ code review và fix nếu cần
Sau khi được duyệt, merge vào develop hoặc main
🧹 Xóa nhánh sau khi merge
Sau khi chức năng đã được merge thành công, hãy xóa nhánh cũ để dọn dẹp:

sh
Sao chép
Chỉnh sửa
git branch -d feature/login # Xóa nhánh local
git push origin --delete feature/login # Xóa nhánh trên GitHub
📌 Tóm tắt quy trình chuẩn Git khi làm việc theo từng chức năng
1️⃣ Pull code mới nhất
2️⃣ Tạo nhánh riêng cho chức năng
3️⃣ Code & Commit từng thay đổi nhỏ
4️⃣ Pull code mới nhất từ nhánh chính trước khi push
5️⃣ Push code lên GitHub
6️⃣ Tạo Pull Request để merge vào nhánh chính
7️⃣ Xóa nhánh sau khi merge thành công

👉 Nếu team bạn làm theo Git Flow, bạn có thể mở rộng với các nhánh như:

feature/_ (Tính năng mới)
bugfix/_ (Fix bug)
hotfix/\* (Sửa lỗi khẩn cấp)
"react-native-safe-area-context": "^4.10.1",

<TouchableOpacity
style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
<View style={{flex: 1, gap: 10}}>
<Text
style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
Phòng Giường Đôi Có Ban Công
</Text>
<View>
<View
style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
<IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
<Text
style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
1 giường đôi
</Text>
</View>
<View
style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
<IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
<Text
style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
Diện tích: 21 m2
</Text>
</View>
</View>
</View>
<Image
source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
style={{width: 60, height: 60, borderRadius: 5}}
/>
</View>
<View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
{amenities?.map(item => (
<View
key={item.id}
style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
<IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
<Text
style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
{item.name}
</Text>
</View>
))}
</View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#0165FC',
                  gap: 10,
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 14,
            borderWidth: 0.2,
            borderColor: '#ccc',
            borderRadius: 2,
            gap: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, gap: 10}}>
              <Text
                style={{
                  color: '#0156ff',
                  fontWeight: '500',
                  fontSize: 16,
                }}>
                Phòng Giường Đôi Có Ban Công
              </Text>
              <View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    1 giường đôi
                  </Text>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <IconComponent
                    name="bed-outline"
                    library="Ionicons"
                    size={18}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Diện tích: 21 m2
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={{
                uri: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=414x232',
              }}
              style={{width: 60, height: 60, borderRadius: 5}}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {amenities?.map(item => (
              <View
                key={item.id}
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <IconComponent
                  name={item.icon.name}
                  library={item.icon.library}
                  size={15}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

          {/* lựa chọn */}
          <View
            style={{
              padding: 16,
              borderWidth: 0.2,
              borderColor: '#ccc',
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <IconComponent
                name="people"
                library="SimpleLineIcons"
                size={18}
              />
              <Text
                style={{
                  color: '#000',
                }}>
                giá cho 2 người lớn
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Hủy miễn phí{' '}
                <Text style={{fontWeight: 'normal'}}>
                  18:00, 24 tháng 1, 2025
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thanh toán trước{' '}
                <Text style={{fontWeight: 'normal'}}>
                  - thanh toán tại chỗ nghỉ
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <IconComponent
                name="check"
                library="MaterialCommunityIcons"
                size={15}
                color="#008234"
              />
              <Text
                style={{
                  color: '#008234',
                  fontWeight: '500',
                }}>
                Không cần thẻ tín dụng
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <IconComponent
                name="coffee"
                library="FontAwesome"
                size={15}
                color="#000"
              />
              <Text
                style={{
                  color: '#000',
                  fontWeight: '700',
                }}>
                Có bữa sáng (thanh toán tại chỗ nghỉ) (VND 150.000)
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Tiết kiệm 25%
              </Text>
              <Text
                style={{
                  backgroundColor: '#008234',
                  color: '#fff',
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  fontSize: 13,
                  alignSelf: 'flex-start',
                }}>
                Ưu Đãi Đầu Năm 2025
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                }}>
                Giá cho 2 đêm
              </Text>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#f20000',
                    textDecorationLine: 'line-through',
                  }}>
                  VNĐ 3.000.000
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  VNĐ 1.350.000
                </Text>
                <IconComponent
                  name="infocirlceo"
                  library="AntDesign"
                  size={18}
                  color="#0165FC"
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                }}>
                Đã bao gồm thuế và phí
              </Text>
              {/* <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#0165FC',
                  gap: 10,
                }}>
                <Text
                  style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                  Lựa chọn và tùy chỉnh
                </Text>
              </TouchableOpacity> */}
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 12,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#0165FC',
                    gap: 10,
                    flex: 1,
                  }}>
                  <Text
                    style={{color: '#0165FC', fontSize: 16, fontWeight: '500'}}>
                    1 phòng
                  </Text>
                  <IconComponent
                    name="angle-down"
                    library="FontAwesome"
                    size={18}
                    color="#0165FC"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#F20000',
                    gap: 10,
                  }}>
                  <IconComponent
                    name="delete"
                    library="AntDesign"
                    size={20}
                    color="#F20000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
