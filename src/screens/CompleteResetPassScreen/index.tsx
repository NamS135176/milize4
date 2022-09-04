import React from 'react';
import {Center, Image, Text, Box, Pressable} from 'native-base';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import ResetPassCom from '~/assets/images/passwordRegistration.svg'
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'CompleteResetPass'>;
  navigation: StackNavigationProp<MainStackParamList, 'CompleteResetPass'>;
}

export default function CompleteResetPassScreen({navigation}: Props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Center flex={1} backgroundColor="white">
        <ResetPassCom></ResetPassCom>
        {/* <Image
          alt="passwordRegistration"
          source={require('~/assets/images/passwordRegistration.png')}></Image> */}
        <Text
          style={{
            fontWeight: 'bold',
            paddingVertical: 15,
            paddingHorizontal: 5,
            fontSize: 20,
          }}>
          新パスワード設定完了です。
        </Text>
        <Pressable
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
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
              miruhoを続ける
            </Text>
          </Box>
        </Pressable>
      </Center>
    </SafeAreaView>
  );
}
