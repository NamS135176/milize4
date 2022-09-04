import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {setAccessToken} from '~/api/api';
export default function FirstScreen({navigation}) {
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('dataToken');
    if (token) {
      setAccessToken(JSON.parse(token).id_token);
      SplashScreen.hide();
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } else {
     const firstTimeApp = await AsyncStorage.getItem('firstTimeApp')
     if(firstTimeApp){
      SplashScreen.hide();
      navigation.reset({
        index: 0,
        routes: [{name: 'Selection'}],
      });
     }
     else{
       await AsyncStorage.setItem('firstTimeApp','FirstTime')
      SplashScreen.hide();
      navigation.reset({
        index: 0,
        routes: [{name: 'IntroSlider'}],
      });
     }
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  return <></>;
}
