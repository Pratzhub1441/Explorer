import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home/Home';
import Maps from './screens/Maps/Maps';
import Transfer from './screens/Transfer/Transfer';
import Settings from './screens/Settings/Settings';
import Profile from './screens/Profile/Profile';
import Login from './screens/Login/Login';
import { AppProvider } from './shared/AppContext/AppContext';
import colors from './assets/colors/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ navigation }: any) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'LiveData') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          else if (route.name === 'Transactions') iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.themeColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 8, paddingTop: 5, height: 80 },
        tabBarLabelStyle: { paddingBottom: 3 },
         headerRight: () => (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
            onPress={() => navigation.replace('Login')}
          >
            <Ionicons name="log-out-outline" size={22} color={colors.themeColor} />
            <Text style={{ marginLeft: 5, color: colors.themeColor, fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transactions" component={Transfer} />
       <Tab.Screen name="LiveData" component={Maps} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({});
