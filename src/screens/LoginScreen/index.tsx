import React, {useState, useRef} from 'react';
import {
  Center,
  Container,
  Text,
  Input,
  useColorModeValue,
  Image,
  Box,
  Pressable,
  FormControl,
  Modal,
} from 'native-base';
import MailSVG from '~/assets/images/mail.svg'
import PasswordSVG from '~/assets/images/password.svg'
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAccessToken} from '../../api/api';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
import api from '../../api/api';
interface Props {
  route: RouteProp<MainStackParamList, 'Login'>;
  navigation: StackNavigationProp<MainStackParamList, 'Login'>;
}
export default function LoginScreen({navigation}: Props) {
  const [show, setShow] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [colorEye, setColorEye] = useState('#ccc')

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChangeMail = (txt: string) => setEmail(txt);
  const handleChangePass = (txt: string) => setPassword(txt);

  const handleSignIn = async () => {
    setIsInvalid(false);
    setIsInvalidPass(false);
    if (!validateEmail(email)) {
      setIsInvalid(true);
    }
    if (password.length < 8) {
      setIsInvalidPass(true);
    }
    if (validateEmail(email) && password.length>=8) {
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
      if (res.status != 200) {
        setShowModal(true);
      } else {
        // console.log(res);
        await AsyncStorage.setItem('dataToken', JSON.stringify(res.data));
        setAccessToken(res.data.id_token);
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box
        flex={1}
        style={{paddingHorizontal: 15, paddingVertical: 20}}
        backgroundColor="white">
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="80%">
            <Text style={{fontSize: 20}}>エラー</Text>
            <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
            メールアドレスまたはパスワードが間違っています。
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
        <Text onPress={() => {navigation.navigate('Selection',{})}} style={{fontWeight: 'bold'}}>キャンセル</Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 35,
            paddingVertical: 20,
            paddingLeft: 10,
          }}>
          ログイン
        </Text>

        <FormControl isRequired isInvalid={isInvalid}>
          <Input
            onChangeText={handleChangeMail}
            keyboardType="email-address"
            autoCompleteType="email"
            isRequired={true}
            type='email'
            InputLeftElement={
              <Box paddingLeft={3} paddingY={3}>
               <MailSVG></MailSVG>
              </Box>
            }
            onFocus={() => {
              setColorEye('#ccc')
            }}
            _focus={{
              borderColor: 'blue',
            }}
            borderWidth={2}
            backgroundColor={'#f5f5f5'}
            borderColor="#f5f5f5"
            size="md"
            placeholder="メールアドレス" // mx={4}
            placeholderTextColor={'#6C7883'}
          />
          <Box paddingLeft={2}>
            <FormControl.ErrorMessage>
              <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} >メールアドレスが正しくないようです。再度入力してください。</Text>
            </FormControl.ErrorMessage>
          </Box>
        </FormControl>
        <FormControl isRequired isInvalid={isInvalidPass}>
          <Box marginTop={15}>
            <Input
              onChangeText={handleChangePass}
              _focus={{
                borderColor: 'blue',
              }}
              onFocus={() => {
                setColorEye('blue')
              }}
              
              autoCompleteType="password"
              type={show ? 'text' : 'password'}
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
                      setShow(!show);
                    }}>
                    {show ? (
                      <Icon name="eye-off" color={colorEye} size={30} />
                    ) : (
                      <Icon name="eye" color={colorEye} size={30} />
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
        <Text
          onPress={() => {
            navigation.navigate('RecoverPassword', {});
          }}
          style={{
            color: 'blue',
            fontWeight: 'bold',
            paddingVertical: 15,
            paddingHorizontal: 5,
          }}>
          パスワードを忘れた方
        </Text>
        <Center>
          <Pressable onPress={handleSignIn}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                ログイン
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
