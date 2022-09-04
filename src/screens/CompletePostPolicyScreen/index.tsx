import React from 'react';
import {Box, Center, Pressable, Text} from 'native-base';
import RegisReception from '../../assets/images/registrationReception.svg';
import {padding} from 'styled-system';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'CompletePostPolicy'>;
  navigation: StackNavigationProp<MainStackParamList, 'CompletePostPolicy'>;
}
export default function CompletePostPolicyScreen({navigation}: Props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Center flex={1} backgroundColor="white">
        <RegisReception></RegisReception>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            marginTop: 20,
          }}>
          保険情報を登録しました。
        </Text>
        <Text
          style={{
            paddingHorizontal: 15,
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 32,
          }}>
          保険情報は3営業日（土日祝休み）以内に
          データ化され保険情報に反映されます。
          反映が完了しましたらお知らせしますので お待ちください。
        </Text>
        <Pressable
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Main'}],
            });
          }}>
          <Box
            marginBottom={100}
            paddingX={5}
            paddingY={2}
            backgroundColor="#0666f0"
            borderRadius={50}>
            <Text color="white">保険情報へ</Text>
          </Box>
        </Pressable>
      </Center>
    </SafeAreaView>
  );
}
