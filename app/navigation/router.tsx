import React, { useEffect, useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../pages/home/Home';
import Search from '../pages/search/Search';
import Account from '../pages/account/Account';
import LocationEntry from '../pages/auth/LocationEntry';
import Login from '../pages/auth/Login';
import OtpVerify from '../pages/auth/OtpVerify';
import NameEntry from '../pages/auth/NameEntry';
import ProductDetails from '../pages/product/ProductDetails';
import Cart from '../pages/cart/Cart';
import AddressSelect from '../pages/address/AddressSelect';
import AddressAdd from '../pages/address/AddressAdd';
import Refer from '../pages/refer/Refer';

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

/**
 * Auth Stack - Screens before user is authenticated
 */
const AuthStackScreen = () => (
  <AuthStack.Navigator 
    screenOptions={{ headerShown: false }}
    initialRouteName="LocationEntry"
  >
    <AuthStack.Screen
      name="LocationEntry"
      component={LocationEntry}
      options={{
        gestureEnabled: false,
      }}
    />
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{
        gestureEnabled: false,
      }}
    />
    <AuthStack.Screen
      name="OtpVerify"
      component={OtpVerify}
    />
    <AuthStack.Screen
      name="NameEntry"
      component={NameEntry}
    />
  </AuthStack.Navigator>
);

/**
 * Main Stack - Screens after user is authenticated
 */
const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{
        gestureEnabled: false,
      }}
    />
    <MainStack.Screen
      name="Search"
      component={Search}
    />
    <MainStack.Screen
      name="Account"
      component={Account}
    />
    <MainStack.Screen
      name="ProductDetails"
      component={ProductDetails}
    />
    <MainStack.Screen
      name="Cart"
      component={Cart}
    />
    <MainStack.Screen
      name="AddressSelect"
      component={AddressSelect}
    />
    <MainStack.Screen
      name="AddressAdd"
      component={AddressAdd}
    />
    <MainStack.Screen
      name="Refer"
      component={Refer}
    />
  </MainStack.Navigator>
);

/**
 * Root Stack Screen - Conditionally renders Auth or Main based on token
 */
const RootStackScreen = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = useCallback(async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);
    } catch (error) {
      console.error('Error checking auth state:', error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthState();
    
    // Poll for token changes (e.g., when user completes registration)
    // In production, consider using an event emitter or context for better performance
    const interval = setInterval(() => {
      checkAuthState();
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, [checkAuthState]);

  // Show loading state if needed
  if (isLoading) {
    return null; // Or return a loading screen component
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
};

/**
 * Router Component - Main router export
 */
export default function Router() {
  return <RootStackScreen />;
}
