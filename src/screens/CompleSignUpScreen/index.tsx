import React, {useState} from 'react';
import {Center, Image, Text, Box, Pressable} from 'native-base';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SignUpCom from '~/assets/images/accountRegistration.svg';
import api from '~/api/api';
import {setAccessToken} from '~/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'CompleteSignUp'>;
  navigation: StackNavigationProp<MainStackParamList, 'CompleteSignUp'>;
}

export default function CompleteSignUpScreen({route, navigation}: Props) {
  const {email, password} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Center flex={1} backgroundColor="white">
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        {/* <SignUpCom></SignUpCom> */}
        <Image
          alt="add"
          source={require('../../assets/images/accountRegistration.png')}></Image>
        <Text
          style={{
            fontWeight: 'bold',
            paddingVertical: 15,
            paddingHorizontal: 5,
            fontSize: 20,
          }}>
          アカウント登録完了です!
        </Text>
        <Text
          style={{
            paddingVertical: 15,
            paddingHorizontal: 5,
            fontSize: 15,
          }}>
          それでは、miruhoを始めていきましょう!
        </Text>
        <Pressable
          onPress={async () => {
            setIsLoading(true);
            const res: any = await api.post(
              'users/sign_in',
              {
                email: email,
                password: password,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
            setIsLoading(false);
            await AsyncStorage.setItem('dataToken', JSON.stringify(res.data));
            setAccessToken(res.data.id_token);
            navigation.reset({
              index: 0,
              routes: [{name: 'Main'}],
            });
          }}>
          <Box
            marginBottom={30}
            marginTop={15}
            paddingX={7}
            paddingY={2}
            backgroundColor="#0666f0"
            borderRadius={50}>
            <Text style={{fontWeight: 'bold'}} color="white">
              miruhoを始める
            </Text>
          </Box>
        </Pressable>
      </Center>
    </SafeAreaView>
  );
}
