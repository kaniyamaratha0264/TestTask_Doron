import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../Screens/SignupScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [flowStatus, setFlowStatus] = useState('');

  useEffect(() => {
    async function getFlowStatus() {
      let flow = await AsyncStorage.getItem('flowStatus');
      setFlowStatus(flow);
    }
    getFlowStatus();
  }, []);

  const MainStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'LoginScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    );
  };

  return flowStatus === 'loginSuccess' ? <AuthStack /> : <MainStack />;
};

export default MainStack;
