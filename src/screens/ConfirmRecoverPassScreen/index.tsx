import React, {useState} from 'react';
import {
  Box,
  Center,
  Text,
  Image,
  Pressable,
  Modal,
  Button,
  Flex,
  Spacer,
} from 'native-base';
import OTPTextInput from 'react-native-otp-textinput';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import api from '~/api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';

interface Props {
  route: RouteProp<MainStackParamList, 'ConfirmRecoverPassword'>;
  navigation: StackNavigationProp<MainStackParamList, 'ConfirmRecoverPassword'>;
}

export default function ConfirmRecoverPasswordScreen({
  route,
  navigation,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [showErr, setShowErr] = useState(false);
  const handleChangeVerifyCode = (txt: string) => setVerifyCode(txt);
  const [isLoading, setIsLoading] = useState(false);
  const {email} = route.params;
  const handleNext = () => {
    if (verifyCode.length != 6) {
      setShowErr(true);
    } else {
      navigation.navigate('ResetPassword', {
        verifyCode: verifyCode,
        email: email,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
       <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
      <Box backgroundColor="white" flex={1}>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="80%">
            <Text style={{fontSize: 20}}>成功</Text>
            <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
              認証コードの送信に成功しまし た。
            </Text>
            <Text
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                textAlign: 'right',
                paddingHorizontal: 15,
                paddingVertical: 20,
                color: '#2097f3',
              }}>
              閉じる
            </Text>
          </Modal.Content>
        </Modal>
        <Flex flexDirection={'row'} justifyContent={'space-between'}>
          <Box padding={5}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('~/assets/images/back.png')}
                alt="back"></Image>
            </Pressable>
          </Box>

          <Box padding={5}>
            <Text style={{fontWeight: 'bold'}}>認証コード入力</Text>
          </Box>
          <Box paddingY={5} paddingX={8}></Box>
        </Flex>
        <Center>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 37,
              paddingLeft: 15,
              paddingTop: 20,
            }}>
            認証コード入力
          </Text>
          <Text style={{textAlign: 'center', width: '64%', marginVertical: 10}}>
            変更したメールアドレスに届いた 認証コードを入力してください。
          </Text>
          <OTPTextInput
            handleTextChange={handleChangeVerifyCode}
            inputCount={6}
            tintColor="blue"
            offTintColor="white"
            textInputStyle={{
              borderBottomWidth: 2,
              borderWidth: 2,
              borderRadius: 5,
              backgroundColor: '#f5f5f5',
              height: 55,
              width: 40,
            }}></OTPTextInput>
          {showErr ? (
            <Text style={{fontSize: 14, paddingTop: 10, color: 'red'}}>
              6桁の確認コードを入力してください。
            </Text>
          ) : (
            <></>
          )}
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}>
            <Text onPress={async () => {
                    setIsLoading(true);
                    const res = await api.patch(
                      'users/reset_password',
                      {
                        email: email,
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      },
                    );
                    setShowModal(true)
                    setIsLoading(false);

            }}
              style={{
                color: 'blue',
                fontWeight: 'bold',
                paddingTop: 40,
                paddingHorizontal: 5,
              }}>
              認証コードを再送
            </Text>
          </Pressable>
          <Pressable onPress={handleNext}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                認証
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
