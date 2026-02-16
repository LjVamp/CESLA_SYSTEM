import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MembershipScreen from './src/screens/MembershipScreen';
import OrderingScreen from './src/screens/OrderingScreen';
import EmployeeLoginScreen from './src/screens/EmployeeLoginScreen';
import EmployeeRegisterScreen from './src/screens/EmployeeRegisterScreen';
import VisitorOrderScreen from './src/screens/VisitorOrderScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import MenuManagementScreen from './src/screens/MenuManagementScreen';
import InventoryManagementScreen from './src/screens/InventoryManagementScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Membership" component={MembershipScreen} />
        <Stack.Screen name="Ordering" component={OrderingScreen} />
        <Stack.Screen name="EmployeeLogin" component={EmployeeLoginScreen} />
        <Stack.Screen name="EmployeeRegister" component={EmployeeRegisterScreen} />
        <Stack.Screen name="VisitorOrder" component={VisitorOrderScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="MenuManagement" component={MenuManagementScreen} />
        <Stack.Screen name="InventoryManagement" component={InventoryManagementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
