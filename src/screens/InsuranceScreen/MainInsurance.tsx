import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import InsuranceScreen from '../InsuranceScreen';
import DetailPolicy from '../DetailPolicy';

import {useDispatch, useSelector} from 'react-redux';
import ProfileScreen from '../ProfileScreen';
// import moduleName from './index'
export default function MainInsurance() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator initialRouteName="InsuranceInfo">
      <Stack.Screen
        name="InsuranceScreen"
        options={{headerShown: false}}
        component={InsuranceScreen}
      />
      <Stack.Screen
        name="DetailPolicy"
        options={{headerShown: false}}
        component={DetailPolicy}
      />
    </Stack.Navigator>
  );
}
