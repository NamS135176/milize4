import React, {useState} from 'react';
import {
  Box,
  Image,
  Pressable,
  Text,
  FormControl,
  Input,
  Center,
  Modal,
} from 'native-base';
import MailSVG from '~/assets/images/mail.svg'
import api from '../../api/api';
import Spinner from 'react-native-loading-spinner-overlay';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'RecoverPassword'>;
  navigation: StackNavigationProp<MainStackParamList, 'RecoverPassword'>;
}

export default function RecoverPasswordScreen({navigation}: Props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChangeEmail = txt => setEmail(txt);

  const handleSendRequest = async () => {
    setIsInvalid(false);
    if (!validateEmail(email)) {
      setIsInvalid(true);
    } else {
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
      setIsLoading(false);
      console.log(res);

      if (res.status != 204) {
        setShowModal(true);
      } else {
        console.log('ok he he');
        navigation.navigate('ConfirmRecover', {email: email});
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box padding={7} flex={1} backgroundColor="white">
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="80%">
            <Text style={{fontSize: 20}}>失敗</Text>
            <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
              確認コードの送信に失敗しまし た。
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
        <Box>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              alt="back"
              source={require('~/assets/images/back.png')}></Image>
          </Pressable>
        </Box>
        <Text style={{fontWeight: 'bold', fontSize: 35, marginTop: 40}}>
          パスワード再設定
        </Text>
        <Text style={{textAlign: 'center', fontSize: 14, marginTop: 15,}}>
          ご登録のメールアドレスに、パスワード再設定用の
        </Text>
        <Text style={{textAlign: 'center', fontSize: 14, marginBottom: 15,paddingTop:5}}>
        認証コードを送信します。
        </Text>
        <FormControl isRequired isInvalid={isInvalid}>
          <Input
            onChangeText={handleChangeEmail}
            isRequired={true}
            InputLeftElement={
              <Box paddingLeft={3} paddingY={3}>
               <MailSVG/>
              </Box>
            }
            _focus={{
              borderColor: 'blue',
            }}
            borderWidth={2}
            backgroundColor={'#f5f5f5'}
            borderColor="#f5f5f5"
            size="md"
            // placeholder="メールアドレス" // mx={4}
            placeholderTextColor={'#6C7883'}
          />
          <Box paddingLeft={2}>
            <FormControl.ErrorMessage>
            <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} >メールアドレスが正しくないようです。再度入力してください。</Text>
            </FormControl.ErrorMessage>
          </Box>
        </FormControl>
        <Center>
          <Pressable onPress={handleSendRequest}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                送信
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
