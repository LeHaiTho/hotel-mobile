import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '@screens/DashboardScreen';
import HomeScreen from '@screens/HomeScreen';
import {Image, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuthStore from '@stores/authStore';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AccountScreen from '@screens/AccountScreen';
import {RouteProp} from '@react-navigation/native';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

const TabNavigator = ({route}: {route: RouteProp<any, any>}) => {
  const {user} = useAuthStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerBackground: () => (
          <View style={{backgroundColor: '#003b95', flex: 1}} />
        ),
        headerTitleStyle: {color: '#fff'},
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        initialParams={route?.params}
        options={{
          tabBarIcon: ({color, size}: {color: string; size: number}) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
          tabBarLabel: 'Tìm kiếm',

          title: 'Booking.com',
          headerRight: () => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingHorizontal: 10,
                gap: 16,
              }}>
              <Ionicons name="chatbubble-outline" color="#fff" size={24} />
              <Ionicons name="notifications-outline" color="#fff" size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={user ? 'Dashboard' : 'Account'}
        component={user ? DashboardScreen : AccountScreen}
        options={{
          headerShown: user ? false : true,
          title: user && '',
          tabBarIcon: ({color, size}: {color: string; size: number}) =>
            user ? (
              <View
                style={{
                  borderRadius: 13,
                  backgroundColor: 'yellow',
                  padding: 2,
                }}>
                <Image
                  source={{uri: user?.image_url}}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                  }}
                />
              </View>
            ) : (
              <EvilIcons name="user" color={color} size={35} />
            ),
          tabBarLabel: user ? 'Tài khoản' : 'Đăng nhập',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
