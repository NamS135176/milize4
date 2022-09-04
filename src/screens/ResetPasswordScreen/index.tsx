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
  FormControl,
  Input,
} from 'native-base';
import api from '../../api/api';
import PasswordSVG from '~/assets/images/password.svg'
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import OTPTextInput from 'react-native-otp-textinput';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  route: RouteProp<MainStackParamList, 'ResetPassword'>;
  navigation: StackNavigationProp<MainStackParamList, 'ResetPassword'>;
}

export default function ResetPasswordScreen({route, navigation}: Props) {
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {verifyCode, email} = route.params;
  const [colorEye1, setColorEye1] = useState('#ccc')
  const [colorEye2, setColorEye2] = useState('#ccc')
  console.log(verifyCode);
  console.log(email);

  const handleChangePass = txt => setPassword(txt);
  const handleChangeCfPass = txt => setCfPassword(txt);

  const handleResetPass = async () => {
    setIsInvalidPass(false);
    if (password.length < 8) {
      setIsInvalidPass(true);
    } else if (password != cfPassword) {
      setShowModal(true);
    } else {
      setIsLoading(true);
      const res = await api.post(
        'users/verify_reset_code',
        {
          email: email,
          new_password: password,
          verify_code: verifyCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setIsLoading(false);
      console.log(res.status);
      if (res.status == 204) {
        navigation.reset({
          index: 0,
          routes: [{name: 'CompleteResetPass'}],
        });
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box backgroundColor="white" flex={1}>
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="80%">
            <Text style={{fontSize: 20}}>失敗</Text>
            <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
              パスワードの再設定に失敗しまし た
            </Text>
            <Text
              onPress={() => {
                setShowModal(false);
              }}
              style={{
                textAlign: 'right',
                paddingHorizontal: 20,
                paddingVertical: 20,
                color: '#2097f3',
              }}>
              OK
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
                alt="back"
                source={require('~/assets/images/back.png')}></Image>
            </Pressable>
          </Box>

          <Box padding={5}>
            <Text style={{fontWeight: 'bold'}}>パスワード変更</Text>
          </Box>
          <Box paddingY={5} paddingX={8}></Box>
        </Flex>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 37,
            paddingLeft: 15,
            paddingTop: 20,
          }}>
          新しいパスワード
        </Text>
        <Box paddingX={4}>
          <FormControl isInvalid={isInvalidPass}>
            <Box marginTop={15}>
              <FormControl.Label>新しいパスワード</FormControl.Label>
              <Input
                onChangeText={handleChangePass}
                _focus={{
                  borderColor: 'blue',
                }}
                type={show ? 'text' : 'password'}
                InputLeftElement={
                  <Box paddingLeft={3} paddingY={3}>
                    <PasswordSVG/>
                  </Box>
                }
                onFocus={() => {
                  setColorEye1('#4F8EF7')
                  setColorEye2('#ccc')
                }}
                borderWidth={2}
                backgroundColor={'#f5f5f5'}
                borderColor="#f5f5f5"
                InputRightElement={
                  <Box paddingRight={3} paddingY={3}>
                    <Pressable
                      onPress={() => {
                        setShow(!show);
                      }}>
                      {show ? (
                        <Icon name="eye-off" color={colorEye1} size={30} />
                      ) : (
                        <Icon name="eye" color={colorEye1} size={30} />
                      )}
                    </Pressable>
                  </Box>
                }
                placeholder="パスワード" // mx={4}
                placeholderTextColor={'#6C7883'}
              />
            </Box>
            <Box paddingLeft={2}>
              <FormControl.ErrorMessage>
              <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} > 8文字以上で入力して下さい。</Text>
               
              </FormControl.ErrorMessage>
            </Box>
          </FormControl>
          <FormControl>
            <Box marginTop={15}>
              <FormControl.Label>確認用パスワード</FormControl.Label>
              <Input
                onChangeText={handleChangeCfPass}
                _focus={{
                  borderColor: 'blue',
                }}
                onFocus={() => {
                  setColorEye1('#ccc')
                  setColorEye2('#4F8EF7')
                }}
                type={showCf ? 'text' : 'password'}
                InputLeftElement={
                  <Box paddingLeft={3} paddingY={3}>
                    <PasswordSVG/>
                  </Box>
                }
                borderWidth={2}
                backgroundColor={'#f5f5f5'}
                borderColor="#f5f5f5"
                InputRightElement={
                  <Box paddingRight={3} paddingY={3}>
                    <Pressable
                      onPress={() => {
                        setShowCf(!showCf);
                      }}>
                      {showCf ? (
                        <Icon name="eye-off" color={colorEye2} size={30} />
                      ) : (
                        <Icon name="eye" color={colorEye2} size={30} />
                      )}
                    </Pressable>
                  </Box>
                }
                placeholder="パスワード" // mx={4}
                placeholderTextColor={'#6C7883'}
              />
            </Box>
            <Box paddingLeft={2}>
              <FormControl.ErrorMessage>
              <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} >上と同じパスワードを入力してください</Text>
                
              </FormControl.ErrorMessage>
            </Box>
          </FormControl>
        </Box>
        <Center>
          <Pressable onPress={handleResetPass}>
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
