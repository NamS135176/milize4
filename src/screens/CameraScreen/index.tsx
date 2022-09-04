import React, {useEffect, useRef, useState} from 'react';
import {
  Box,
  Flex,
  Image,
  Pressable,
  Text,
  Center,
  ScrollView,
} from 'native-base';
import {RNCamera} from 'react-native-camera';
import {Dimensions} from 'react-native';
import cameraStyles from './cameraStyle';
import {RouteProp, useIsFocused} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraComponent from './CameraComponent';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'Camera'>;
  navigation: StackNavigationProp<MainStackParamList, 'Camera'>;
}

export default function CameraScreen({navigation, route}: Props) {
  const isFocus = useIsFocused();
  console.log(route.params.listImg);
  
  if(isFocus){
    return <CameraComponent listImg={route.params.listImg} navigation={navigation} route={route}></CameraComponent>
  }
  else{
    return <Box></Box>
  }
}
