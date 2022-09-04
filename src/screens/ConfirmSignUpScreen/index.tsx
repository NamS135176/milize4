import React, {useState} from 'react';
import {Box, Center, Text, Image, Pressable, Modal, Button} from 'native-base';
import OTPTextInput from 'react-native-otp-textinput';
import Spinner from 'react-native-loading-spinner-overlay';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import api from '../../api/api';
interface Props {
  route: RouteProp<MainStackParamList, 'ConfirmSignUp'>;
  navigation: StackNavigationProp<MainStackParamList, 'ConfirmSignUp'>;
}

export default function ConfirmSignUpScreen({route, navigation}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [modalMess, setModalMess] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(route.params.data.access_token)
  const {data, email ,password} = route.params;
  // console.log(data.access_token);
  // console.log(email);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    const res = await api.post(
      'users/verify_code',
      {
        access_token: token,
        email: email,
        verify_code: verifyCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    setIsLoading(false);
    console.log(res);
    if (res.status != 204) {
      // console.log("aloalo");
      setShowModal(true);
      setModalMess('認証コードが違います。もう一度メールを確認して下さい。');
      setModalTitle('失敗');
    } else {
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'CompleteSignUp'}],
      // });
      navigation.navigate('CompleteSignUp', {email:email, password:password});
    }
  };

  const handleResendVerifyCode = async () => {
    setIsLoading(true);
    const res = await api.post(
      'users/sign_up',
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
    console.log(res.data.access_token);
    
    setToken(res.data.access_token)
    setIsLoading(false);
    setModalTitle('成功')
    setModalMess('認証コードの送信に成功しまし た。')
    setShowModal(true)
    console.log(res);
  };

  const handleChangeVerifyCode = txt => setVerifyCode(txt);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box backgroundColor="white" flex={1}>
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="80%">
            <Text style={{fontSize: 20}}>
              {/* 成功 */}
              {modalTitle}
            </Text>
            <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
              {modalMess}
              {/* 認証コードの送信に成功しまし た。 */}
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
        <Text style={{fontWeight: 'bold', fontSize: 35, paddingLeft: 15}}>
          認証コード入力
        </Text>
        <Center>
          <Text
            style={{
              textAlign: 'center',
              width: '65%',
              marginVertical: 10,
              paddingTop: 20,
            }}>
            ご登録のメールアドレスに届いた 認証コードを入力してください。
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
          <Pressable onPress={handleResendVerifyCode}>
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                paddingTop: 40,
                paddingHorizontal: 5,
              }}>
              認証コードを再送
            </Text>
          </Pressable>
          <Pressable onPress={handleVerifyCode}>
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
