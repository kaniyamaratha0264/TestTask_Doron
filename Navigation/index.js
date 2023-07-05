import React, {useEffect, useState} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupScreen from '../Screens/SignupScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [initialRouteName, setInitialRouteName] = useState('LoginScreen');

  useEffect(() => {
    async function getFlowStatus() {
      let flow = await AsyncStorage.getItem('flowStatus');
      flow === 'loginSuccess' && setInitialRouteName('HomeScreen');
    }
    getFlowStatus();
  }, []);

  console.log(initialRouteName);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
