import React from 'react';
import {Button, Center, Image, Text, Box, Pressable} from 'native-base';
import {StyleSheet} from 'react-native';
import {Linking} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  route: RouteProp<MainStackParamList, 'Selection'>;
  navigation: StackNavigationProp<MainStackParamList, 'Selection'>;
}

const styles = StyleSheet.create({
  textDes: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    paddingVertical:3
  },
});

export default function SelectionScreen({navigation}: Props) {
  return (
    <Center backgroundColor="white" flex={1}>
      <Image
        style={{width: '50%', height: '40%'}}
        source={require('~/assets/images/manage.png')}
        alt="manage"></Image>
      <Box marginTop={50}>
        <Text style={styles.textDes}>保険証券を撮影して</Text>
        <Text style={styles.textDes}>一括管理しましょう。</Text>
      </Box>
      <Pressable
        onPress={() => {
          navigation.navigate('SignUp', {});
        }}>
        <Box
          marginBottom={50}
          marginTop={50}
          paddingX={7}
          paddingY={3}
          backgroundColor="#0666f0"
          borderRadius={50}>
          <Text style={{fontWeight: 'bold'}} color="white">
            アカウント作成して始める
          </Text>
        </Box>
      </Pressable>
      <Text
        onPress={() => {
          navigation.navigate('Login', {});
        }}
        style={{color: '#0666f0', fontWeight: 'bold', marginBottom: 50}}>
        ログイン
      </Text>
      <Text
        onPress={() =>
          Linking.openURL(
            'mailto:support@miruho.com?subject=SendMail&body=Description',
          )
        }
        style={{color: '#0666f0'}}>
        {'お問い合わせ >'}
      </Text>
    </Center>
  );
}
