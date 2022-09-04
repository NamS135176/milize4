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
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'ConfirmChangeMail'>;
  navigation: StackNavigationProp<MainStackParamList, 'ConfirmChangeMail'>;
}

export default function ConfirmChangeMailScreen({
  route,
  navigation,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [showErr, setShowErr] = useState(false);
  const handleChangeVerifyCode = (txt: string) => setVerifyCode(txt);

  const handleNext = () => {

  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box backgroundColor="white" flex={1}>
        {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
        </Modal> */}
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
