import React, {useState} from 'react';
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
import Spinner from 'react-native-loading-spinner-overlay';
import MailSVG from '~/assets/images/mail.svg'
import PasswordSVG from '~/assets/images/password.svg'
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../api/api';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'SignUp'>;
  navigation: StackNavigationProp<MainStackParamList, 'SignUp'>;
}

const titles = [
  {
    title: 'プライバシーステートメント',
    link: 'https://privacy.miruho.com/',
  },
  {
    title: '利用規約',
    link: 'https://terms.miruho.com/',
  },
];

export default function SignUpScreen({navigation}) {
  const [show, setShow] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [colorEye, setColorEye] = useState('#ccc')
  let [isLoading, setIsloading] = useState(false);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChangeMail = txt => setEmail(txt);
  const handleChangePass = txt => setPassword(txt);

  const handleSignUp = async () => {
    setIsInvalid(false);
    if (!validateEmail(email)) {
      setIsInvalid(true);
    } else if (password.length < 8) {
    } else {
      setIsloading(true);
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
      setIsloading(false);
      if (res.status != 201) {
        setShowModal(true);
      } else {
        const data = res.data;
        navigation.navigate('ConfirmSignUp', {data: data, email: email, password:password});
      }
    }
    // setIsInvalidPass(!isInvalidPass)
    // navigation.navigate('ConfirmSignUp')
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
              ユーザー登録に失敗しました。
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
        <Text onPress={() => {navigation.goBack()}} style={{fontWeight: 'bold'}}>キャンセル</Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 35,
            paddingVertical: 20,
            paddingLeft: 5,
          }}>
          アカウント作成
        </Text>

        <FormControl isRequired isInvalid={isInvalid}>
          <Input
            onChangeText={handleChangeMail}
            isRequired={true}
            InputLeftElement={
              <Box paddingLeft={3} paddingY={3}>
                <MailSVG/>
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
        <Box marginTop={19}>
          <Input
            onChangeText={handleChangePass}
            _focus={{
              borderColor: 'blue',
            }}
            type={show ? 'text' : 'password'}
            InputLeftElement={
              <Box paddingLeft={3} paddingY={3}>
                <PasswordSVG></PasswordSVG>
              </Box>
            }
            onFocus={() => {
              setColorEye('blue')
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
        <Text
          style={{
            fontWeight: 'bold',
            paddingVertical: 15,
            paddingHorizontal: 5,
            fontSize: 13,
            color: 'gray',
            paddingLeft: 10,
          }}>
          8文字以上で入力してください。
        </Text>
        <Box marginTop={9}>
          <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', lineHeight:30}}>
            新規登録は
            <Text
              onPress={() => {
                navigation.navigate('WebView', {item: titles[1]});
              }}
              style={{fontSize: 14, color: 'blue', fontWeight: 'bold'}}>
              利用規約
            </Text>
            と
            <Text
              onPress={() => {
                navigation.navigate('WebView', {item: titles[0]});
              }}
              style={{fontSize: 14, color: 'blue', fontWeight: 'bold'}}>
              プライバシーステートメント
            </Text>
            に
          </Text>
          <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>
            同意したものとみなします。
          </Text>
        </Box>
        <Center>
          <Pressable onPress={handleSignUp}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                登録する
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
